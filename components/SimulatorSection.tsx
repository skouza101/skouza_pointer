import React, { useState, useEffect, useRef } from "react";
import { Variable } from "../types";

const INITIAL_CODE = `int a = 10;
int b = 25;

int *ptr;

ptr = &a;

int y = *ptr;

*ptr = 99;

ptr = &b;

*ptr = *ptr + 5;`;

const INITIAL_ADDRESS = 0x100;

interface ExecutionState {
  variables: Variable[];
  log: string;
  highlightedLine: number;
  activePointers: { fromId: string; toAddr: number }[];
}

const SimulatorSection: React.FC = () => {
  const [code, setCode] = useState(INITIAL_CODE);
  const [isEditing, setIsEditing] = useState(true);
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState<ExecutionState[]>([
    {
      variables: [],
      log: "Ready to run.",
      highlightedLine: -1,
      activePointers: [],
    },
  ]);

  const lines = code.split("\n");

  const parseAndExecute = (
    line: string,
    currentVars: Variable[]
  ): { newVars: Variable[]; log: string } => {
    let vars = JSON.parse(JSON.stringify(currentVars));
    const cleanLine = line.trim();

    if (!cleanLine || cleanLine.startsWith("//")) {
      return { newVars: vars, log: "Skipping comment/empty line." };
    }

    const nextAddr =
      vars.length > 0 ? vars[vars.length - 1].address + 4 : INITIAL_ADDRESS;

    let match = cleanLine.match(/^int\s+(\w+)\s*=\s*(\d+);$/);
    if (match) {
      const [_, name, valStr] = match;
      if (vars.find((v: Variable) => v.name === name))
        return {
          newVars: vars,
          log: `Error: Variable '${name}' already exists.`,
        };
      vars.push({
        id: name,
        name,
        type: "int",
        value: parseInt(valStr),
        address: nextAddr,
      });
      return {
        newVars: vars,
        log: `Allocated int '${name}' = ${valStr} at 0x${nextAddr.toString(
          16
        )}`,
      };
    }

    match = cleanLine.match(/^int\s+(\w+);$/);
    if (match) {
      const [_, name] = match;
      if (vars.find((v: Variable) => v.name === name))
        return {
          newVars: vars,
          log: `Error: Variable '${name}' already exists.`,
        };
      vars.push({ id: name, name, type: "int", value: 0, address: nextAddr });
      return {
        newVars: vars,
        log: `Allocated int '${name}' at 0x${nextAddr.toString(16)}`,
      };
    }

    match = cleanLine.match(/^int\s*\*\s*(\w+);$/);
    if (match) {
      const [_, name] = match;
      if (vars.find((v: Variable) => v.name === name))
        return {
          newVars: vars,
          log: `Error: Variable '${name}' already exists.`,
        };
      vars.push({
        id: name,
        name,
        type: "int*",
        value: null,
        address: nextAddr,
      });
      return {
        newVars: vars,
        log: `Allocated ptr '${name}' at 0x${nextAddr.toString(16)}`,
      };
    }

    match = cleanLine.match(/^(\w+)\s*=\s*&(\w+);$/);
    if (match) {
      const [_, ptrName, varName] = match;
      const ptr = vars.find((v: Variable) => v.name === ptrName);
      const target = vars.find((v: Variable) => v.name === varName);

      if (!ptr || ptr.type !== "int*")
        return {
          newVars: vars,
          log: `Error: '${ptrName}' is not a valid pointer.`,
        };
      if (!target)
        return {
          newVars: vars,
          log: `Error: Variable '${varName}' not found.`,
        };

      ptr.value = target.address;
      return {
        newVars: vars,
        log: `Assigned &${varName} (0x${target.address.toString(
          16
        )}) to ${ptrName}`,
      };
    }

    match = cleanLine.match(/^\*(\w+)\s*=\s*(\d+);$/);
    if (match) {
      const [_, ptrName, valStr] = match;
      const ptr = vars.find((v: Variable) => v.name === ptrName);

      if (!ptr)
        return { newVars: vars, log: `Error: Pointer '${ptrName}' not found.` };
      if (ptr.value === null)
        return {
          newVars: vars,
          log: `Error: Segmentation Fault (*${ptrName} is NULL).`,
        };

      const target = vars.find((v: Variable) => v.address === ptr.value);
      if (!target)
        return { newVars: vars, log: `Error: Memory access violation.` };

      target.value = parseInt(valStr);
      return {
        newVars: vars,
        log: `Wrote ${valStr} to address 0x${ptr.value.toString(16)}`,
      };
    }

    match = cleanLine.match(/^int\s+(\w+)\s*=\s*\*(\w+);$/);
    if (match) {
      const [_, newName, ptrName] = match;
      const ptr = vars.find((v: Variable) => v.name === ptrName);

      if (!ptr || ptr.value === null)
        return { newVars: vars, log: `Error: Invalid pointer read.` };
      const target = vars.find((v: Variable) => v.address === ptr.value);

      if (vars.find((v: Variable) => v.name === newName))
        return {
          newVars: vars,
          log: `Error: Variable '${newName}' already exists.`,
        };

      vars.push({
        id: newName,
        name: newName,
        type: "int",
        value: target?.value || 0,
        address: nextAddr,
      });
      return {
        newVars: vars,
        log: `Allocated '${newName}' = ${target?.value} (read from *${ptrName})`,
      };
    }

    match = cleanLine.match(/^\*(\w+)\s*=\s*\*(\w+)\s*([\+\-])\s*(\d+);$/);
    if (match) {
      const [_, p1, p2, op, valStr] = match;
      if (p1 !== p2)
        return {
          newVars: vars,
          log: "Error: Only simple *p = *p ± n supported.",
        };

      const ptr = vars.find((v: Variable) => v.name === p1);
      if (!ptr || ptr.value === null)
        return { newVars: vars, log: "Error: Segfault." };

      const target = vars.find((v: Variable) => v.address === ptr.value);
      if (!target) return { newVars: vars, log: "Error: Invalid memory." };

      const num = parseInt(valStr);
      const oldVal = target.value;
      target.value = op === "+" ? oldVal + num : oldVal - num;
      return {
        newVars: vars,
        log: `Calculated ${oldVal} ${op} ${num}. Wrote ${
          target.value
        } to 0x${target.address.toString(16)}.`,
      };
    }

    return {
      newVars: vars,
      log: `Syntax error or unsupported command: ${cleanLine}`,
    };
  };

  const handleNext = () => {
    if (step >= lines.length) {
      setIsRunning(false);
      return;
    }

    const currentLine = lines[step];
    const currentState = history[history.length - 1];

    if (!currentLine.trim() || currentLine.trim().startsWith("//")) {
      setStep((prev) => prev + 1);
      setHistory((prev) => [
        ...prev,
        {
          ...currentState,
          highlightedLine: step,
          log: "Skipped comment/empty line.",
        },
      ]);
      return;
    }

    const { newVars, log } = parseAndExecute(
      currentLine,
      currentState.variables
    );

    const activePointers = newVars
      .filter((v: Variable) => v.type === "int*" && v.value !== null)
      .map((v: Variable) => ({ fromId: v.id, toAddr: v.value }));

    const newState: ExecutionState = {
      variables: newVars,
      log,
      highlightedLine: step,
      activePointers,
    };

    setHistory((prev) => [...prev, newState]);
    setStep((prev) => prev + 1);
  };

  const startSimulation = () => {
    setIsEditing(false);
    setStep(0);
    setHistory([
      {
        variables: [],
        log: "Simulation started.",
        highlightedLine: -1,
        activePointers: [],
      },
    ]);
  };

  const stopEditing = () => {
    setIsEditing(true);
    setIsRunning(false);
    setStep(0);
  };

  useEffect(() => {
    let interval: any;
    if (isRunning && step < lines.length) {
      interval = setInterval(handleNext, 1000);
    } else if (step >= lines.length) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, step, lines.length]);

  const currentState =
    history.length > 0
      ? history[history.length - 1]
      : { variables: [], log: "", highlightedLine: -1, activePointers: [] };

  const getItemCenter = (index: number) => {
    const width = 128; // w-32
    const gap = 24; // gap-6
    return index * (width + gap) + width / 2;
  };

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden flex flex-col md:flex-row h-auto min-h-[600px]">
      <div className="w-full md:w-1/3 bg-[#1e1e1e] border-r border-slate-700 flex flex-col font-mono text-sm">
        <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900/50">
          <span className="text-slate-400 font-bold">main.c</span>
          <div className="flex space-x-2">
            {isEditing ? (
              <button
                onClick={startSimulation}
                className="px-4 py-1.5 text-xs font-bold text-white bg-green-600 rounded hover:bg-green-500 transition-colors flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Run Code
              </button>
            ) : (
              <>
                <button
                  onClick={stopEditing}
                  className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-700 rounded hover:bg-slate-600 transition-colors"
                >
                  Edit Code
                </button>
                <button
                  onClick={handleNext}
                  disabled={step >= lines.length || isRunning}
                  className="px-3 py-1 text-xs font-medium text-white bg-primary hover:bg-blue-600 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step
                </button>
                {!isRunning && step < lines.length && (
                  <button
                    onClick={() => setIsRunning(true)}
                    className="p-1 text-slate-400 hover:text-white"
                    title="Auto Play"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto relative bg-[#1e1e1e]">
          {isEditing ? (
            <textarea
              className="w-full h-full bg-[#1e1e1e] text-slate-300 p-4 outline-none resize-none font-mono leading-relaxed"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              placeholder="// Type your C code here..."
            />
          ) : (
            <div className="p-4 space-y-1">
              {lines.map((line, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    idx === currentState.highlightedLine
                      ? "bg-cyan-900/40 -mx-4 px-4 py-1"
                      : "py-1"
                  }`}
                >
                  <div
                    className={`w-6 text-right pr-3 select-none text-xs ${
                      idx === currentState.highlightedLine
                        ? "text-cyan-400 font-bold"
                        : "text-slate-600"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 whitespace-pre-wrap break-all">
                    <span
                      className={`${
                        idx === currentState.highlightedLine
                          ? "text-cyan-100"
                          : line.trim().startsWith("//")
                          ? "text-slate-500 italic"
                          : "text-slate-300"
                      }`}
                    >
                      {line}
                    </span>
                  </div>
                </div>
              ))}
              {step >= lines.length && (
                <div className="mt-4 text-green-500 font-bold px-8 text-xs">
                  -- End of Program --
                </div>
              )}
            </div>
          )}
        </div>

        <div className="h-32 bg-black border-t border-slate-700 p-3 font-mono text-xs overflow-y-auto">
          <div className="flex justify-between text-slate-500 mb-1">
            <span>Terminal Output:</span>
            {!isEditing && (
              <span className="text-[10px]">
                Step {step} / {lines.length}
              </span>
            )}
          </div>
          <div
            className={`${
              currentState.log.startsWith("Error")
                ? "text-red-400"
                : "text-green-400"
            } font-bold`}
          >
            {">"} {currentState.log}
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3 bg-slate-900 p-8 flex flex-col">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-slate-300 font-bold text-lg">
            RAM (Stack Memory)
          </h3>
          <div className="flex gap-4 text-xs font-medium">
            <div className="flex items-center">
              <div className="w-3 h-3 border-2 border-cyan-500 rounded mr-2"></div>
              Integer
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 border-2 border-purple-500 rounded mr-2"></div>
              Pointer
            </div>
          </div>
        </div>

        <div className="flex-1 relative overflow-x-auto overflow-y-hidden">
          <div className="relative min-w-[600px] h-[300px]">
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="10"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#a855f7" />
                </marker>
              </defs>
              {currentState.activePointers.map((ptr, idx) => {
                const fromIndex = currentState.variables.findIndex(
                  (v: Variable) => v.id === ptr.fromId
                );
                const toIndex = currentState.variables.findIndex(
                  (v: Variable) => v.address === ptr.toAddr
                );

                if (fromIndex === -1 || toIndex === -1) return null;

                const x1 = getItemCenter(fromIndex);
                const x2 = getItemCenter(toIndex);
                const y = 80;
                const controlY = y - 60 - Math.abs(fromIndex - toIndex) * 20;

                return (
                  <path
                    key={idx}
                    d={`M ${x1} ${y} Q ${(x1 + x2) / 2} ${controlY} ${x2} ${y}`}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    className="animate-[dash_1s_ease-in-out]"
                  />
                );
              })}
            </svg>

            <div className="flex gap-6 absolute top-[80px] left-0">
              {currentState.variables.map((variable: Variable) => (
                <div
                  key={variable.id}
                  className={`w-32 h-32 rounded-xl border-2 flex flex-col justify-between p-3 relative bg-slate-800 shadow-lg transition-all duration-300
                                ${
                                  variable.type === "int"
                                    ? "border-cyan-500 shadow-cyan-900/20"
                                    : "border-purple-500 shadow-purple-900/20"
                                }
                            `}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-slate-500 font-mono">
                      0x{variable.address.toString(16).toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {variable.type}
                    </span>
                  </div>
                  <div className="text-center font-mono font-bold text-2xl text-white break-all">
                    {variable.type === "int*" && variable.value
                      ? `0x${variable.value.toString(16)}`
                      : variable.value === null
                      ? "?"
                      : variable.value}
                  </div>
                  <div className="text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        variable.type === "int"
                          ? "bg-cyan-900/50 text-cyan-200"
                          : "bg-purple-900/50 text-purple-200"
                      }`}
                    >
                      {variable.name}
                    </span>
                  </div>
                </div>
              ))}

              {currentState.variables.length === 0 && (
                <div className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-xl">
                  <span className="text-slate-500 font-medium">
                    Memory Empty
                  </span>
                  <span className="text-slate-600 text-xs mt-1">
                    Run code to allocate memory
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorSection;
