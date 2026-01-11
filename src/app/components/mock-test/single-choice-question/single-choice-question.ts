import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionModel } from '../../../models/question.model';
import { SelectAnswerRadioPipe } from '../../../pipes/selectRadioAnswer/select-answer-radio-pipe';

@Component({
  selector: 'app-single-choice-question',
  imports: [MatRadioModule, CommonModule, SelectAnswerRadioPipe],
  templateUrl: './single-choice-question.html',
  styleUrl: './single-choice-question.scss',
})
export class SingleChoiceQuestion {
  @Input({ required: true }) question!: QuestionModel;

  onSelect(value: any) {
    this.question.givenAnswer = [value];
    if (this.question.givenAnswer && this.question.givenAnswer.length) {
      this.question.status = 'answered';
    }
  }
}
