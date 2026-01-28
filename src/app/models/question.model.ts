import { OptionalTypeNode } from "typescript";

export interface AnswerSet {
  text: string;
  value: any;
}

export interface QuestionModel {
  questionId: number;
  questionText: string;
  typeName: 'SingleChoice' | 'MultipleChoice' | 'TrueFalse';
  marks: number;
  answerSet: {answerSet: AnswerSet[]} | any;
  status ?:'unanswered' | 'answered' | 'review';
  givenAnswer: string[];
  givenAnswerValue?: boolean; 
}
