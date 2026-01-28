import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QuestionModel } from '../../../models/question.model';
import { SelectAnswerRadioPipe } from '../../../pipes/selectRadioAnswer/select-answer-radio-pipe';

@Component({
  selector: 'app-multiple-choice-question',
  imports: [MatCheckboxModule, CommonModule, SelectAnswerRadioPipe],
  templateUrl: './multiple-choice-question.html',
  styleUrl: './multiple-choice-question.scss',
})
export class MultipleChoiceQuestion {
  @Input({ required: true }) question!: QuestionModel;


  toggle(value:any, checked:boolean){
     if (checked) {
      this.question.givenAnswer.push(value);
    } else {
      this.question.givenAnswer = this.question.givenAnswer.filter(v => v !== value);
    }

    if (this.question.givenAnswer && this.question.givenAnswer.length) {
      this.question.status = 'answered';
    } else {
      this.question.status = 'unanswered';
    }
  }
}


