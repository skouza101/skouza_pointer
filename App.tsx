import React, { useState } from "react";
import NavBar from "./components/NavBar";
import DefinitionSection from "./components/DefinitionSection";
import AnalogySection from "./components/AnalogySection";
import SimulatorSection from "./components/SimulatorSection";
import PitfallsSection from "./components/PitfallsSection";
import AITutor from "./components/AITutor";
import { Section } from "./types";
import { LanguageProvider, useLanguage } from "./LanguageContext";

const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(
    Section.DEFINITION
  );
  const { t } = useLanguage();

  const scrollToSection = (section: Section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      <NavBar activeSection={activeSection} onNavigate={scrollToSection} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-24">
        <div className="text-center py-20">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
            {t.hero.title}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={() => scrollToSection(Section.SIMULATOR)}
              className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-blue-500/20"
            >
              {t.hero.trySimulator}
            </button>
            <button
              onClick={() => scrollToSection(Section.ANALOGY)}
              className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-full font-bold transition-all"
            >
              {t.hero.startLearning}
            </button>
          </div>
        </div>

        <section id={Section.DEFINITION} className="scroll-mt-24">
          <DefinitionSection />
        </section>

        <section id={Section.ANALOGY} className="scroll-mt-24">
          <AnalogySection />
        </section>

        <section id={Section.SIMULATOR} className="scroll-mt-24">
          <SimulatorSection />
        </section>

        <section id={Section.PITFALLS} className="scroll-mt-24">
          <PitfallsSection />
        </section>

        <section id={Section.TUTOR} className="scroll-mt-24">
          <AITutor />
        </section>
      </main>

      <footer className="mt-32 border-t border-slate-800 py-12 text-center text-slate-500">
        <p>{t.footer.copyright}</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
