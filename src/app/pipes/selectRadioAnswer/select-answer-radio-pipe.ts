import { Pipe, PipeTransform } from '@angular/core';
import { QuestionModel } from '../../models/question.model';

@Pipe({
  name: 'selectAnswerRadio',
  standalone: true,
})
export class SelectAnswerRadioPipe implements PipeTransform {
  transform(question: QuestionModel, ...args: string[]): boolean {
    if (question.givenAnswer && question.givenAnswer.length) {
      return question.givenAnswer.findIndex((x) => x === args[0]) >= 0;
    }
    return false;
  }
}
