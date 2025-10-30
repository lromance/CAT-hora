export enum View {
  Explain = 'Explain',
  Learn = 'Learn',
  Practice = 'Practice',
}

export enum ExerciseType {
  ClockToText = 'ClockToText',
  TextToClock = 'TextToClock',
  MultipleChoice = 'MultipleChoice',
}

export interface Time {
  hour: number;
  minute: number;
}

export interface QuizQuestion extends Time {
  id: string;
  type: ExerciseType;
  correctAnswer: string;
  options?: string[];
  timeOptions?: Time[];
}
