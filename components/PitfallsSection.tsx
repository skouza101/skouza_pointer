import React from "react";

const PitfallsSection: React.FC = () => {
  const pitfalls = [
    {
      title: "Uninitialized Pointers",
      description:
        "Declaring a pointer without assigning it a valid address causes it to point to garbage memory.",
      code: `int *ptr; 
*ptr = 10;`,
      fix: `int x;
int *ptr = &x;
*ptr = 10;`,
    },
    {
      title: "Dangling Pointers",
      description:
        "A pointer that references memory that has been freed or is out of scope.",
      code: `int *ptr;
{
  int x = 5;
  ptr = &x;
} 
printf("%d", *ptr);`,
      fix: "Always ensure the variable outlives the pointer.",
    },
    {
      title: "Memory Leaks",
      description:
        "Allocating memory with malloc() but forgetting to free() it.",
      code: `void loop() {
   int *ptr = malloc(sizeof(int));
   // ... do stuff
}`,
      fix: `free(ptr);`,
    },
  ];

  return (
    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
        <span className="bg-red-500 w-2 h-8 mr-4 rounded-full"></span>
        Common Pitfalls
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pitfalls.map((pitfall, idx) => (
          <div
            key={idx}
            className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 hover:border-red-500/50 transition-colors"
          >
            <div className="p-5 border-b border-slate-800 bg-red-500/5">
              <h3 className="font-bold text-red-400">{pitfall.title}</h3>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-slate-300">{pitfall.description}</p>

              <div className="bg-black/50 p-3 rounded text-xs font-mono border-l-2 border-red-500">
                <pre className="text-slate-300 whitespace-pre-wrap">
                  {pitfall.code}
                </pre>
              </div>

              <div className="bg-black/50 p-3 rounded text-xs font-mono border-l-2 border-green-500">
                <pre className="text-slate-300 whitespace-pre-wrap">
                  {pitfall.fix}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PitfallsSection;
