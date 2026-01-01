import React from "react";
import { useLanguage } from "../LanguageContext";

const PitfallsSection: React.FC = () => {
  const { t } = useLanguage();

  const pitfalls = [
    {
      title: t.pitfalls.uninitializedTitle,
      description: t.pitfalls.uninitializedDesc,
      code: `int *ptr; 
*ptr = 10;`,
      fix: `int x;
int *ptr = &x;
*ptr = 10;`,
    },
    {
      title: t.pitfalls.danglingTitle,
      description: t.pitfalls.danglingDesc,
      code: `int *ptr;
{
  int x = 5;
  ptr = &x;
} 
printf("%d", *ptr);`,
      fix: t.pitfalls.danglingFix,
    },
    {
      title: t.pitfalls.memoryLeakTitle,
      description: t.pitfalls.memoryLeakDesc,
      code: `void loop() {
   int *ptr = malloc(sizeof(int));
}`,
      fix: `free(ptr);`,
    },
  ];

  return (
    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
        <span className="bg-red-500 w-2 h-8 mr-4 rounded-full"></span>
        {t.pitfalls.title}
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
