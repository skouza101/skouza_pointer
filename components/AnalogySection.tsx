import React, { useState } from "react";

const AnalogySection: React.FC = () => {
  const [highlight, setHighlight] = useState<
    "house" | "address" | "mailbox" | null
  >(null);

  return (
    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
        <span className="bg-purple-600 w-2 h-8 mr-4 rounded-full"></span>
        The Mailbox Analogy
      </h2>

      <p className="text-slate-300 mb-8">
        Think of computer memory as a giant street with infinitely many houses.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative bg-slate-900 rounded-xl p-8 border border-slate-700 flex justify-center items-center min-h-[300px]">
          <svg viewBox="0 0 400 200" className="w-full h-full max-w-md">
            <g
              className={`transition-opacity duration-300 ${
                highlight && highlight !== "house"
                  ? "opacity-30"
                  : "opacity-100"
              }`}
              onClick={() => setHighlight("house")}
            >
              <rect
                x="50"
                y="80"
                width="100"
                height="100"
                fill="#3b82f6"
                rx="4"
              />
              <path d="M50 80 L100 40 L150 80 Z" fill="#2563eb" />
              <text
                x="100"
                y="140"
                textAnchor="middle"
                fill="white"
                fontSize="24"
                fontWeight="bold"
              >
                10
              </text>
              <text
                x="100"
                y="170"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="12"
              >
                Value
              </text>
              <text
                x="100"
                y="30"
                textAnchor="middle"
                fill="#cbd5e1"
                fontSize="14"
                fontWeight="bold"
              >
                Variable 'x'
              </text>
            </g>

            <g
              className={`transition-opacity duration-300 ${
                highlight && highlight !== "address"
                  ? "opacity-30"
                  : "opacity-100"
              }`}
              onClick={() => setHighlight("address")}
            >
              <rect
                x="60"
                y="185"
                width="80"
                height="25"
                fill="#f59e0b"
                rx="4"
              />
              <text
                x="100"
                y="202"
                textAnchor="middle"
                fill="#1e293b"
                fontSize="12"
                fontWeight="bold"
              >
                Addr: 1024
              </text>
            </g>

            <g
              className={`transition-opacity duration-300 ${
                highlight && highlight !== "mailbox"
                  ? "opacity-30"
                  : "opacity-100"
              }`}
              onClick={() => setHighlight("mailbox")}
            >
              <rect
                x="250"
                y="100"
                width="80"
                height="60"
                fill="#e2e8f0"
                transform="rotate(-5 290 130)"
              />
              <text
                x="290"
                y="125"
                textAnchor="middle"
                fill="#1e293b"
                fontSize="14"
                fontWeight="bold"
                transform="rotate(-5 290 130)"
              >
                Go to:
              </text>
              <text
                x="290"
                y="145"
                textAnchor="middle"
                fill="#dc2626"
                fontSize="16"
                fontWeight="bold"
                transform="rotate(-5 290 130)"
              >
                1024
              </text>

              <text
                x="290"
                y="70"
                textAnchor="middle"
                fill="#cbd5e1"
                fontSize="14"
                fontWeight="bold"
              >
                Pointer 'ptr'
              </text>

              <path
                d="M250 130 Q 200 130 160 190"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="5,5"
                markerEnd="url(#arrow)"
              />
            </g>

            <defs>
              <marker
                id="arrow"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,6 L9,3 z" fill="#dc2626" />
              </marker>
            </defs>
          </svg>
        </div>

        <div className="space-y-4">
          <div
            className={`p-4 rounded-lg border transition-colors cursor-pointer ${
              highlight === "house"
                ? "bg-blue-500/20 border-blue-500"
                : "bg-slate-900 border-slate-700 hover:bg-slate-750"
            }`}
            onMouseEnter={() => setHighlight("house")}
            onMouseLeave={() => setHighlight(null)}
          >
            <h3 className="font-bold text-white mb-1">The House (Variable)</h3>
            <p className="text-sm text-slate-400">
              This represents a variable{" "}
              <code className="text-primary">int x = 10;</code>. It exists in
              the physical world and contains contents (the value 10).
            </p>
          </div>

          <div
            className={`p-4 rounded-lg border transition-colors cursor-pointer ${
              highlight === "address"
                ? "bg-orange-500/20 border-orange-500"
                : "bg-slate-900 border-slate-700 hover:bg-slate-750"
            }`}
            onMouseEnter={() => setHighlight("address")}
            onMouseLeave={() => setHighlight(null)}
          >
            <h3 className="font-bold text-white mb-1">The Address Plate</h3>
            <p className="text-sm text-slate-400">
              Every house has a unique location. In C, we get this using{" "}
              <code className="text-accent">&x</code>. It's fixed and tells us
              where the variable lives.
            </p>
          </div>

          <div
            className={`p-4 rounded-lg border transition-colors cursor-pointer ${
              highlight === "mailbox"
                ? "bg-red-500/20 border-red-500"
                : "bg-slate-900 border-slate-700 hover:bg-slate-750"
            }`}
            onMouseEnter={() => setHighlight("mailbox")}
            onMouseLeave={() => setHighlight(null)}
          >
            <h3 className="font-bold text-white mb-1">The Note (Pointer)</h3>
            <p className="text-sm text-slate-400">
              A pointer <code className="text-red-400">int *ptr</code> is just a
              piece of paper (another variable) that holds the <em>address</em>{" "}
              written on it. It doesn't hold the house, just directions to it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalogySection;
