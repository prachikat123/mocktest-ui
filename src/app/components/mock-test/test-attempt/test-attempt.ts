import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionModel } from '../../../models/question.model';
import { MockTestService } from '../../../services/api/mock-test.service';
import { MultipleChoiceQuestion } from '../multiple-choice-question/multiple-choice-question';
import { SingleChoiceQuestion } from '../single-choice-question/single-choice-question';
import { TrueFalseQuestion } from '../true-false-question/true-false-question';

@Component({
  selector: 'app-test-attempt',
  imports: [
    FormsModule,
    CommonModule,
    SingleChoiceQuestion,
    MultipleChoiceQuestion,
    TrueFalseQuestion,
  ],
  templateUrl: './test-attempt.html',
  styleUrl: './test-attempt.scss',
  encapsulation: ViewEncapsulation.None
})
export class TestAttempt implements OnInit, OnDestroy {
  // mockTest: MockTestModel;
  questions: QuestionModel[] = [];
  currentIndex = 0;

  answers: { [questionId: number]: any } = {};
  // questionStatus: { [questionId: number]: 'unanswered' | 'answered' | 'review' } = {};

  remainingTime!: number;
  timerInterval: any;

  constructor(
    private route: ActivatedRoute,
    private mockTestService: MockTestService,
    private router: Router
  ) {}

  ngOnInit() {
    const subjectId = Number(this.route.snapshot.queryParamMap.get('subjectId'));
    const levelId = Number(this.route.snapshot.queryParamMap.get('levelId'));
    const duration = Number(this.route.snapshot.queryParamMap.get('duration'));
    this.remainingTime = duration * 60;

    this.mockTestService.getQuestions(subjectId, levelId).subscribe((res) => {
      this.questions = res as QuestionModel[];
    });

    this.startTimer();
  }
  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.remainingTime--;

      if (this.remainingTime === 0) {
        this.submitTest();
      }
    }, 1000);
  }

  get formattedTime(): string {
    const m = Math.floor(this.remainingTime / 60);
    const s = this.remainingTime % 60;
    return `${m}:${s < 10 ? '0' + s : s}`;
  }

  markForReview() {
    this.questions[this.currentIndex].status = 'review';
  }

  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  jumpInto(index: number) {
    this.currentIndex = index;
  }

  submitTest() {
    console.log(this.questions);
    /*     clearInterval(this.timerInterval);

    const payload = {
      answers: this.answers,
    };

    this.mockTestService.submitTest(payload).subscribe((res) => {
      this.router.navigate(['/mock-test/result'], {
        state: res,
      });
    }); */
  }
}
