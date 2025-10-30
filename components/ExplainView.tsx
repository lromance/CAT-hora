import React, { useState } from 'react';
import AnalogClock from './AnalogClock.tsx';
import { formatTwoDigits } from '../utils/timeToCatalan.ts';
import { translations } from '../translations/translations.ts';

interface ExampleRowProps {
  hour: number;
  minute: number;
  text: React.ReactNode;
  description: string;
  translatedDescription: string;
}

const ExampleRow: React.FC<ExampleRowProps> = ({ hour, minute, text, description, translatedDescription }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-8 py-4 border-b border-slate-200 last:border-b-0">
    <div className="flex flex-col items-center">
      <AnalogClock hour={hour} minute={minute} size={120} />
      <div className="mt-2 font-mono text-xl text-slate-600 bg-slate-100 px-2 py-1 rounded">
        {formatTwoDigits(hour)}:{formatTwoDigits(minute)}
      </div>
    </div>
    <div className="md:col-span-2">
      <p className="text-xl md:text-2xl font-bold text-sky-800 mb-2">{text}</p>
      <p className="text-slate-600">{description}</p>
      <p className="text-slate-500 italic mt-1">{translatedDescription}</p>
    </div>
  </div>
);

type LanguageKey = keyof typeof translations;

const ExplainView: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>('es');
  const t = translations[selectedLanguage];
  const availableLanguages: { [key in LanguageKey]: string } = {
    hy: 'Armeni',
    es: 'Castellà',
    en: 'Anglès',
    fr: 'Francès',
    ka: 'Georgià',
    hi: 'Hindi',
    ne: 'Nepalí',
    ru: 'Rus',
    uk: 'Ucraïnès',
    ur: 'Urdú',
    zh: 'Xinès',
  };


  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-sky-700 mb-2">{t.mainTitle_ca}</h2>
      <p className="text-slate-500 italic mb-4">{t.mainTitle}</p>
      
      <div className="mb-8">
        <label htmlFor="language-select" className="block text-sm font-medium text-slate-700 mb-1">
          {t.selectLanguage_ca}
        </label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value as LanguageKey)}
          className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full md:w-1/3 p-2.5"
        >
          {Object.entries(availableLanguages).sort(([, a], [, b]) => a.localeCompare(b)).map(([key, name]) => (
            <option key={key} value={key}>{name}</option>
          ))}
        </select>
      </div>

      <p className="text-slate-600 mb-6">
        {t.intro_ca}
        <span className="block text-slate-500 italic mt-1">{t.intro}</span>
      </p>

      {/* Section 1: Hores en punt */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-sky-200">{t.section1Title_ca}</h3>
         <p className="text-slate-500 italic -mt-4 mb-4 text-xl">{t.section1Title}</p>
        <p className="mb-4 text-slate-700">
            {t.section1Intro_ca}
            <span className="block text-slate-500 italic mt-1">{t.section1Intro}</span>
        </p>
        <div className="bg-slate-50 rounded-lg p-4">
          <ExampleRow 
            hour={3} minute={0} 
            text={<>Són les <span className="text-rose-600">tres</span> en punt.</>}
            description={t.descEnPunt1_ca}
            translatedDescription={t.descEnPunt1}
          />
          <ExampleRow 
            hour={1} minute={0} 
            text={<>És la <span className="text-rose-600">una</span> en punt.</>}
            description={t.descEnPunt2_ca}
            translatedDescription={t.descEnPunt2}
          />
        </div>
      </section>
      
      {/* Section 2: El sistema de quarts */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-sky-200">{t.section2Title_ca}</h3>
        <p className="text-slate-500 italic -mt-4 mb-4 text-xl">{t.section2Title}</p>
        <p className="mb-4 text-slate-700">
            {t.section2Intro_ca}
            <span className="block text-slate-500 italic mt-1">{t.section2Intro}</span>
        </p>
        <div className="bg-slate-50 rounded-lg p-4 space-y-4">
          <ExampleRow 
            hour={2} minute={15} 
            text={<>És <span className="text-indigo-600">un quart</span> de <span className="text-rose-600">tres</span>.</>}
            description={t.descQuarts1_ca}
            translatedDescription={t.descQuarts1}
          />
          <ExampleRow 
            hour={2} minute={30} 
            text={<>Són <span className="text-indigo-600">dos quarts</span> de <span className="text-rose-600">tres</span>.</>}
            description={t.descQuarts2_ca}
            translatedDescription={t.descQuarts2}
          />
          <ExampleRow 
            hour={2} minute={45} 
            text={<>Són <span className="text-indigo-600">tres quarts</span> de <span className="text-rose-600">tres</span>.</>}
            description={t.descQuarts3_ca}
            translatedDescription={t.descQuarts3}
          />
        </div>
      </section>
      
      {/* Section 3: Minuts entre quarts */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-sky-200">{t.section3Title_ca}</h3>
        <p className="text-slate-500 italic -mt-4 mb-4 text-xl">{t.section3Title}</p>
        <p className="mb-4 text-slate-700">
            {t.section3Intro_ca}
            <span className="block text-slate-500 italic mt-1">{t.section3Intro}</span>
        </p>
        <div className="bg-slate-50 rounded-lg p-4 space-y-4">
          <ExampleRow 
            hour={8} minute={20} 
            text={<>És <span className="text-indigo-600">un quart i cinc</span> de <span className="text-rose-600">nou</span>.</>}
            description={t.descMinuts1_ca}
            translatedDescription={t.descMinuts1}
          />
           <ExampleRow 
            hour={8} minute={40} 
            text={<>Són <span className="text-indigo-600">dos quarts i deu</span> de <span className="text-rose-600">nou</span>.</>}
            description={t.descMinuts2_ca}
            translatedDescription={t.descMinuts2}
          />
          <ExampleRow 
            hour={8} minute={55} 
            text={<>Són <span className="text-indigo-600">tres quarts i deu</span> de <span className="text-rose-600">nou</span>.</>}
            description={t.descMinuts3_ca}
            translatedDescription={t.descMinuts3}
          />
        </div>
      </section>

      {/* Section 4: Primers minuts */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-sky-200">{t.section4Title_ca}</h3>
        <p className="text-slate-500 italic -mt-4 mb-4 text-xl">{t.section4Title}</p>
        <p className="mb-4 text-slate-700">
            {t.section4Intro_ca}
            <span className="block text-slate-500 italic mt-1">{t.section4Intro}</span>
        </p>
        <div className="bg-slate-50 rounded-lg p-4">
          <ExampleRow 
            hour={4} minute={10} 
            text={<>Són les <span className="text-rose-600">quatre</span> i <span className="text-indigo-600">deu</span>.</>}
            description={t.descPrimersMinuts_ca}
            translatedDescription={t.descPrimersMinuts}
          />
        </div>
      </section>

      {/* Section 5: Casos especials */}
      <section>
        <h3 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-sky-200">{t.section5Title_ca}</h3>
        <p className="text-slate-500 italic -mt-4 mb-4 text-xl">{t.section5Title}</p>
        <p className="mb-4 text-slate-700">
            {t.section5Intro_ca}
            <span className="block text-slate-500 italic mt-1">{t.section5Intro}</span>
        </p>
        <div className="bg-slate-50 rounded-lg p-4">
          <ExampleRow 
            hour={12} minute={0} 
            text={<>És <span className="text-amber-600">migdia</span>.</>}
            description={t.descEspecials1_ca}
            translatedDescription={t.descEspecials1}
          />
          <ExampleRow 
            hour={0} minute={0} 
            text={<>És <span className="text-purple-700">mitjanit</span>.</>}
            description={t.descEspecials2_ca}
            translatedDescription={t.descEspecials2}
          />
        </div>
      </section>
    </div>
  );
};

export default ExplainView;