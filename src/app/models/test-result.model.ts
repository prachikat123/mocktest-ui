import { QuestionResultModel } from "./question-result.model";

export interface TestResultModel {
  attemptId: number;
  testName: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  score: number;
  status: string;
  startTime: string;
  endTime: string;
  durationInMinutes: number;
  questionResults: QuestionResultModel[];
}
