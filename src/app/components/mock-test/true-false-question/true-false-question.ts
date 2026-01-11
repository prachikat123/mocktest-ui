import { Component, Input } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionModel } from '../../../models/question.model';
import { SelectAnswerRadioPipe } from '../../../pipes/selectRadioAnswer/select-answer-radio-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-true-false-question',
  imports: [MatRadioModule, CommonModule, SelectAnswerRadioPipe],
  templateUrl: './true-false-question.html',
  styleUrl: './true-false-question.scss',
})
export class TrueFalseQuestion {
  @Input({ required: true }) question!: QuestionModel;

  onChange(value: boolean) {
    this.question.givenAnswer = [String(value)];
    if (this.question.givenAnswer && this.question.givenAnswer.length) {
      this.question.status = 'answered';
    }
  }
}
