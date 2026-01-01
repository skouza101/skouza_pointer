import React, { useState } from "react";
import { generateExplanation } from "../services/geminiService";

const DefinitionSection: React.FC = () => {
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    setLoading(true);
    const explanation = await generateExplanation("What is a pointer in C?");
    setAiExplanation(explanation);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
          <span className="bg-blue-600 w-2 h-8 mr-4 rounded-full"></span>
          What is a Pointer?
        </h2>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          In C programming, a <strong className="text-primary">pointer</strong>{" "}
          is a variable that stores the
          <em className="text-accent not-italic mx-1">memory address</em> of
          another variable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 font-mono text-sm">
            <div className="text-purple-400">int</div>{" "}
            <span className="text-white">score</span> ={" "}
            <span className="text-orange-400">95</span>;
            <div className="mt-4 text-slate-400 text-xs">
              Stores the value <span className="text-orange-400">95</span>{" "}
              directly.
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 bg-yellow-500/10 text-yellow-500 text-xs font-bold rounded-bl-lg">
              POINTER
            </div>
            <div className="text-purple-400">int</div> *
            <span className="text-white">ptr</span> = &
            <span className="text-white">score</span>;
            <div className="mt-4 text-slate-400 text-xs">
              Stores the <span className="text-primary">address</span> of the
              variable 'score'.
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Key Operators</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-slate-700 px-2 py-1 rounded font-mono text-accent mr-3">
                &
              </span>
              <span className="text-slate-300">
                <strong>Address-of Operator:</strong> Returns the memory address
                of a variable.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-slate-700 px-2 py-1 rounded font-mono text-accent mr-3">
                *
              </span>
              <span className="text-slate-300">
                <strong>Dereference Operator:</strong> Accesses the value stored
                at the address held by the pointer.
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-8 border-t border-slate-700 pt-6">
          <button
            onClick={handleAskAI}
            disabled={loading}
            className="flex items-center text-primary hover:text-blue-400 transition-colors"
          >
            <svg
              className={`w-5 h-5 mr-2 ${loading ? "animate-spin" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            {loading
              ? "Consulting Professor AI..."
              : "Explain like I am 5 (AI Generated)"}
          </button>

          {aiExplanation && (
            <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg text-slate-200 animate-fade-in text-sm">
              <h4 className="font-bold text-primary mb-2">
                Professor AI says:
              </h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: aiExplanation.replace(
                    /\*\*(.*?)\*\*/g,
                    "<strong>$1</strong>"
                  ),
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DefinitionSection;
