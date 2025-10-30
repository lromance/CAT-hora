import React, { useState, useEffect } from 'react';
import AnalogClock from './AnalogClock.tsx';
import { timeToCatalan, formatTwoDigits } from '../utils/timeToCatalan.ts';

const LearnView: React.FC = () => {
  const [date, setDate] = useState(new Date());

  const hour = date.getHours();
  const minute = date.getMinutes();

  useEffect(() => {
    const timerId = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(date);
    newDate.setHours(parseInt(e.target.value, 10));
    setDate(newDate);
  };
  
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(date);
    newDate.setMinutes(parseInt(e.target.value, 10));
    setDate(newDate);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-sky-700 mb-2">Aprèn les Hores</h2>
      <p className="text-slate-600 mb-6">Mou els controls per veure com es diu l'hora en català.</p>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center p-6 bg-slate-50 rounded-lg">
          <AnalogClock hour={hour} minute={minute} size={250} />
          <div className="mt-6 text-4xl font-bold text-slate-700 tracking-wider">
            {formatTwoDigits(hour)}:{formatTwoDigits(minute)}
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center p-6 bg-sky-100 border-l-4 border-sky-500 rounded-r-lg">
            <p className="text-2xl md:text-3xl font-bold text-sky-800">
              {timeToCatalan(hour, minute)}
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="hour" className="block text-sm font-medium text-slate-700 mb-1">Hora: {formatTwoDigits(hour)}</label>
              <input 
                id="hour" 
                type="range" 
                min="0" 
                max="23" 
                value={hour}
                onChange={handleHourChange}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>
            <div>
              <label htmlFor="minute" className="block text-sm font-medium text-slate-700 mb-1">Minut: {formatTwoDigits(minute)}</label>
              <input 
                id="minute" 
                type="range" 
                min="0" 
                max="59" 
                value={minute}
                onChange={handleMinuteChange}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnView;