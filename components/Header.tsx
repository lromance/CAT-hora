
import React from 'react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const navItemClasses = "px-4 py-2 rounded-md transition-colors duration-300 cursor-pointer text-lg font-semibold";
  const activeClasses = "bg-sky-600 text-white shadow-md";
  const inactiveClasses = "text-slate-600 hover:bg-sky-200";

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-2xl font-bold text-slate-800">Rellotge Català</h1>
        </div>
        <nav className="flex space-x-2 bg-slate-200 p-1 rounded-lg">
          <div
            onClick={() => setCurrentView(View.Explain)}
            className={`${navItemClasses} ${currentView === View.Explain ? activeClasses : inactiveClasses}`}
          >
            Dir l'hora
          </div>
          <div
            onClick={() => setCurrentView(View.Learn)}
            className={`${navItemClasses} ${currentView === View.Learn ? activeClasses : inactiveClasses}`}
          >
            Aprèn
          </div>
          <div
            onClick={() => setCurrentView(View.Practice)}
            className={`${navItemClasses} ${currentView === View.Practice ? activeClasses : inactiveClasses}`}
          >
            Practica
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
