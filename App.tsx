import React, { useState } from 'react';
import Header from './components/Header.tsx';
import LearnView from './components/LearnView.tsx';
import PracticeView from './components/PracticeView.tsx';
import { View } from './types.ts';
import ExplainView from './components/ExplainView.tsx';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Explain);

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="container mx-auto p-4 md:p-8">
        {currentView === View.Explain && <ExplainView />}
        {currentView === View.Learn && <LearnView />}
        {currentView === View.Practice && <PracticeView />}
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Creat amb ♥ per a l'aprenentatge del català.</p>
        <p className="mt-1">
          © Luis Romance / <a href="https://www.cfalapau.cat" target="_blank" rel="noopener noreferrer" className="underline hover:text-sky-600">CFA La Pau</a>
        </p>
      </footer>
    </div>
  );
};

export default App;