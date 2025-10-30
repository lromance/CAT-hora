import { useState, useCallback } from 'react';
import { QuizQuestion, ExerciseType, Time } from '../types.ts';
import { timeToCatalan } from '../utils/timeToCatalan.ts';

// Function to get a random minute that aligns with the 'quarts' system for cleaner questions
const getRandomMinute = (): number => {
  const options = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  return options[Math.floor(Math.random() * options.length)];
};

const generateIncorrectOptions = (correctTime: Time): string[] => {
    const options: string[] = [];
    const { hour, minute } = correctTime;
    
    // Option 1: Wrong hour
    options.push(timeToCatalan((hour + 1) % 24, minute));
    
    // Option 2: Wrong minute (flipped)
    options.push(timeToCatalan(hour, 60 - minute === 60 ? 0 : 60-minute));

    // Option 3: Swap hour and minute conceptual quarter
    if (minute === 15) {
         options.push(timeToCatalan(hour, 45));
    } else if (minute === 30) {
         options.push(timeToCatalan(hour, 0));
    } else {
         options.push(timeToCatalan((hour + 2) % 24, minute));
    }

    // Ensure unique options
    return [...new Set(options)];
};

const generateIncorrectTimeOptions = (correctTime: Time): Time[] => {
    const options: Set<string> = new Set();
    const { hour, minute } = correctTime;

    while (options.size < 3) {
        const randomHour = Math.floor(Math.random() * 24);
        const randomMinute = getRandomMinute();
        const candidateTime = { hour: randomHour, minute: randomMinute };

        if (candidateTime.hour !== hour || candidateTime.minute !== minute) {
            options.add(JSON.stringify(candidateTime));
        }
    }
    
    return Array.from(options).map(s => JSON.parse(s));
};


export const useTimeGenerator = () => {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);

  const generateNewQuestion = useCallback((level: 'easy' | 'advanced') => {
    const hour = Math.floor(Math.random() * 24);
    const minute = getRandomMinute();
    const correctAnswer = timeToCatalan(hour, minute);
    
    let type: ExerciseType;
    let options: string[] | undefined;
    let timeOptions: Time[] | undefined;

    if (level === 'easy') {
      type = Math.random() > 0.5 ? ExerciseType.MultipleChoice : ExerciseType.TextToClock;
      
      if (type === ExerciseType.MultipleChoice) {
          const incorrect = generateIncorrectOptions({hour, minute});
          const allOptions = [correctAnswer, ...incorrect].slice(0, 4);
          options = allOptions.sort(() => Math.random() - 0.5);
      } else { // TextToClock
          const incorrectTimes = generateIncorrectTimeOptions({hour, minute});
          const allTimeOptions = [{hour, minute}, ...incorrectTimes].slice(0, 4);
          timeOptions = allTimeOptions.sort(() => Math.random() - 0.5);
      }

    } else { // advanced
      type = ExerciseType.ClockToText;
    }

    setQuestion({
      id: `${Date.now()}-${hour}-${minute}`,
      hour,
      minute,
      type,
      correctAnswer,
      options,
      timeOptions,
    });
  }, []);

  return { question, generateNewQuestion };
};