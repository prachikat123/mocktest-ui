export interface QuestionResultModel {
  questionId: number;
  questionText: string;
  isAttempted: boolean;
  userAnswer: string[] | null;
  correctAnswer: string[];
  selectedAnswer: string[];
  isCorrect: boolean | null;
}
