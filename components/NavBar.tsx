import React from "react";
import { Section } from "../types";
import { useLanguage } from "../LanguageContext";

interface NavBarProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeSection, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { id: Section.DEFINITION, label: t.nav.definition },
    { id: Section.ANALOGY, label: t.nav.analogy },
    { id: Section.SIMULATOR, label: t.nav.simulator },
    { id: Section.PITFALLS, label: t.nav.pitfalls },
    { id: Section.TUTOR, label: t.nav.tutor },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary font-mono">
              SKOUZA
            </span>
            <span className="ml-2 font-semibold text-white">PointerMaster</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-primary text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={toggleLanguage}
              className="ml-4 px-3 py-1.5 rounded-md text-sm font-bold bg-slate-700 hover:bg-slate-600 text-white transition-colors flex items-center gap-2"
            >
              {language === "en" ? "🇫🇷 FR" : "🇬🇧 EN"}
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-md text-sm font-bold bg-slate-700 hover:bg-slate-600 text-white transition-colors"
            >
              {language === "en" ? "🇫🇷" : "🇬🇧"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
