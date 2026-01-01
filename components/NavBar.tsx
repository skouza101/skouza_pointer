import React from 'react';
import { Section } from '../types';

interface NavBarProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: Section.DEFINITION, label: 'Definition' },
    { id: Section.ANALOGY, label: 'Analogy' },
    { id: Section.SIMULATOR, label: 'Simulator' },
    { id: Section.PITFALLS, label: 'Pitfalls' },
    { id: Section.TUTOR, label: 'AI Tutor' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary font-mono">SKOUZA</span>
            <span className="ml-2 font-semibold text-white">PointerMaster</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-primary text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;