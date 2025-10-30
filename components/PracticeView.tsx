import React, { useState, useEffect } from 'react';
import { useTimeGenerator } from '../hooks/useTimeGenerator';
import { ExerciseType, Time } from '../types';
import AnalogClock from './AnalogClock';
import { getGeminiExplanation } from '../services/geminiService';
import { timeToCatalan } from '../utils/timeToCatalan';

const PracticeView: React.FC = () => {
  const { question, generateNewQuestion } = useTimeGenerator();
  const [level, setLevel] = useState<'easy' | 'advanced'>('easy');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | 'waiting' | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [geminiExplanation, setGeminiExplanation] = useState('');
  const [isExplanationLoading, setIsExplanationLoading] = useState(false);

  useEffect(() => {
    generateNewQuestion(level);
    setScore(0);
    setTotal(0);
    setFeedback(null);
    setUserAnswer('');
    setGeminiExplanation('');
  }, [level, generateNewQuestion]);

  const handleCheckAnswer = () => {
    if (!question || userAnswer === '') return;

    const normalize = (str: string) => str.toLowerCase().replace(/[. ]/g, '');
    const isCorrect = normalize(userAnswer) === normalize(question.correctAnswer);

    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('incorrect');
    }
    setTotal(t => t + 1);
    setGeminiExplanation('');
  };
  
  const handleNextQuestion = () => {
    generateNewQuestion(level);
    setFeedback(null);
    setUserAnswer('');
    setGeminiExplanation('');
  };

  const handleOptionClick = (option: string) => {
    if (feedback) return;
    setUserAnswer(option);
  };
  
  const handleTimeOptionClick = (time: Time) => {
    if (feedback) return;
    const answerText = timeToCatalan(time.hour, time.minute);
    setUserAnswer(answerText);
  };

  useEffect(() => {
    if (userAnswer && (question?.type === ExerciseType.MultipleChoice || question?.type === ExerciseType.TextToClock)) {
      handleCheckAnswer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAnswer, question]);


  const fetchExplanation = async () => {
      if (!question) return;
      setIsExplanationLoading(true);
      setGeminiExplanation('');
      const explanation = await getGeminiExplanation(question.hour, question.minute);
      setGeminiExplanation(explanation);
      setIsExplanationLoading(false);
  };

  if (!question) {
    return <div>Carregant exercici...</div>;
  }

  const feedbackClasses = {
    correct: 'bg-emerald-100 border-emerald-500 text-emerald-800',
    incorrect: 'bg-rose-100 border-rose-500 text-rose-800',
    waiting: 'bg-sky-100 border-sky-500 text-sky-800'
  };

  const levelButtonClasses = "px-6 py-2 rounded-full font-semibold transition-all duration-300 w-full";
  const activeLevelClasses = "bg-sky-600 text-white shadow-md";
  const inactiveLevelClasses = "bg-slate-200 text-slate-700 hover:bg-sky-200";

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg animate-fade-in max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
        <h2 className="text-3xl font-bold text-sky-700">Practica</h2>
        <div className="text-lg font-bold text-slate-600 bg-slate-200 px-4 py-1 rounded-full self-start">
          Punts: <span className="text-sky-700">{score} / {total}</span>
        </div>
      </div>
      
       <div className="grid grid-cols-2 items-center gap-2 mb-6 p-1 bg-slate-100 rounded-full">
        <button
          onClick={() => setLevel('easy')}
          className={`${levelButtonClasses} ${level === 'easy' ? activeLevelClasses : inactiveLevelClasses}`}
        >
          Nivell Fàcil
        </button>
        <button
          onClick={() => setLevel('advanced')}
          className={`${levelButtonClasses} ${level === 'advanced' ? activeLevelClasses : inactiveLevelClasses}`}
        >
          Nivell Avançat
        </button>
      </div>
      
      <div className="text-center p-8 bg-slate-50 rounded-lg min-h-[264px] flex items-center justify-center">
        {question.type === ExerciseType.TextToClock ? (
           <div>
            <p className="text-slate-600 font-semibold mb-2">Com es representa aquesta hora?</p>
            <p className="text-2xl md:text-3xl font-bold text-sky-800">{question.correctAnswer}</p>
          </div>
        ) : (
          <AnalogClock hour={question.hour} minute={question.minute} size={200} />
        )}
      </div>

      <div className="mt-6">
        {question.type !== ExerciseType.TextToClock && (
          <p className="text-center text-slate-600 font-semibold mb-4">Quina hora és?</p>
        )}
        
        {question.type === ExerciseType.ClockToText && (
          <form onSubmit={(e) => { e.preventDefault(); handleCheckAnswer(); }}>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={feedback !== null}
                placeholder="Escriu l'hora aquí..."
                className="flex-grow p-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              />
              <button
                type="submit"
                disabled={feedback !== null || userAnswer === ''}
                className="px-6 py-3 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 transition shadow disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                Comprova
              </button>
            </div>
          </form>
        )}

        {question.type === ExerciseType.MultipleChoice && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.options?.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(opt)}
                disabled={feedback !== null}
                className={`p-4 border-2 rounded-lg text-left transition font-semibold
                  ${feedback === null ? 'border-slate-300 hover:bg-sky-100 hover:border-sky-400' : 'cursor-not-allowed'}
                  ${feedback !== null && opt === question.correctAnswer ? 'bg-emerald-100 border-emerald-500' : ''}
                  ${feedback !== null && userAnswer === opt && opt !== question.correctAnswer ? 'bg-rose-100 border-rose-500' : ''}
                  ${feedback !== null && userAnswer !== opt && opt !== question.correctAnswer ? 'opacity-50' : ''}
                `}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {question.type === ExerciseType.TextToClock && question.timeOptions && (
          <div className="grid grid-cols-2 gap-4">
            {question.timeOptions.map((timeOpt, i) => {
              const optionText = timeToCatalan(timeOpt.hour, timeOpt.minute);
              return (
                <button
                  key={i}
                  onClick={() => handleTimeOptionClick(timeOpt)}
                  disabled={feedback !== null}
                  className={`p-2 border-2 rounded-lg transition flex justify-center items-center
                    ${feedback === null ? 'border-slate-300 hover:bg-sky-100 hover:border-sky-400' : 'cursor-not-allowed'}
                    ${feedback !== null && optionText === question.correctAnswer ? 'bg-emerald-100 border-emerald-500' : ''}
                    ${feedback !== null && userAnswer === optionText && optionText !== question.correctAnswer ? 'bg-rose-100 border-rose-500' : ''}
                    ${feedback !== null && userAnswer !== optionText && optionText !== question.correctAnswer ? 'opacity-50' : ''}
                  `}
                >
                  <AnalogClock hour={timeOpt.hour} minute={timeOpt.minute} size={120} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {feedback && (
        <div className={`mt-4 p-4 border-l-4 rounded-r-lg ${feedbackClasses[feedback]}`}>
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-bold">
                {feedback === 'correct' ? 'Correcte!' : 'Incorrecte!'}
              </p>
              {feedback === 'incorrect' && <p>La resposta correcta és: <strong>{question.correctAnswer}</strong></p>}
              
              {geminiExplanation && (
                 <div className="mt-2 pt-2 border-t border-slate-300/50 text-sm">
                   <p className="font-bold mb-1">Explicació de l'IA:</p>
                   <p>{geminiExplanation}</p>
                 </div>
              )}
              {isExplanationLoading && (
                 <div className="mt-2 pt-2 text-sm italic text-slate-600">L'assistent d'IA està pensant...</div>
              )}
            </div>
            <div className="flex flex-col items-end space-y-2 ml-2 flex-shrink-0">
                <button 
                  onClick={handleNextQuestion}
                  className="px-6 py-2 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 transition shadow"
                >
                  Següent
                </button>
                {feedback === 'incorrect' && !geminiExplanation && !isExplanationLoading && (
                  <button onClick={fetchExplanation} className="text-sm text-sky-700 hover:underline font-semibold whitespace-nowrap">
                    Explica-m'ho
                  </button>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeView;
