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
  encapsulation: ViewEncapsulation.None,
})
export class TestAttempt implements OnInit, OnDestroy {
  attemptId!: number;
  questions: QuestionModel[] = [];
  currentIndex = 0;

  answers: { [questionId: number]: any } = {};
  // questionStatus: { [questionId: number]: 'unanswered' | 'answered' | 'review' } = {};

  remainingTime!: number;
  displayTime = '';
  timerInterval: any;

  constructor(
    private route: ActivatedRoute,
    private mockTestService: MockTestService,
    private router: Router,
  ) {}

  ngOnInit() {
    const testId = Number(this.route.snapshot.queryParamMap.get('testId'));
    const subjectId = Number(this.route.snapshot.queryParamMap.get('subjectId'));
    const levelId = Number(this.route.snapshot.queryParamMap.get('levelId'));
    const duration = Number(this.route.snapshot.queryParamMap.get('duration'));

    this.mockTestService.getQuestions(subjectId, levelId).subscribe((res) => {
      this.questions = res as QuestionModel[];

      // this.startTimer();

      const savedAttemptId = localStorage.getItem('attemptId');

      if (savedAttemptId) {
        this.attemptId = Number(savedAttemptId);
        this.callRemainingTimeApi();
      } else {
        this.mockTestService.startTest(testId).subscribe((res2: any) => {
          this.attemptId = res2.attemptId;

          localStorage.setItem('attemptId', this.attemptId.toString());
          this.remainingTime = duration * 60;
          this.startTimer();
          // this.callRemainingTimeApi();
        });
      }
    });
  }
  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }

  private callRemainingTimeApi(): void {
    this.mockTestService.getRemainingTime(this.attemptId).subscribe({
      next: (res) => {
        console.log('API response', res);

        const startTime = new Date(res.startTime).getTime();
        const durationMs = res.durationInMinutes * 60 * 1000;
        const endTime = startTime + durationMs;

        const now = new Date().getTime();
        const remainingMs = endTime - now;

        if (remainingMs <= 0) {
          this.timeUp();
          return;
        }
        this.remainingTime = Math.floor(remainingMs / 1000);

        this.startTimer();
      },
      error: (err) => {
        console.error('API error', err);
      },
    });
  }
  timeUp() {
    clearInterval(this.timerInterval);
    alert('Time is over! Your test submitted.');
    this.submitTest();
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
    // console.log(this.questions);
    clearInterval(this.timerInterval);

    localStorage.removeItem('attemptId');

    const payload = {
      attemptId: this.attemptId,
      answers: this.questions.map((q) => ({
        questionId: q.questionId,
        selectedAnswer: Array.isArray(q.givenAnswer) ? q.givenAnswer : [],
      })),
    };

    console.log('SUBMIT PAYLOAD:', JSON.stringify(payload, null, 2));

    this.mockTestService.submitTest(payload).subscribe({
      next: (res) => {
        this.router.navigate(['/test-result', res.attemptId]);
        console.log('Submit success', res);
      },
      error: (err) => {
        // //const validationErrors = err?.error?.errors || err?.message || 'Unknown error';
        console.error('Submit failed', err);
        alert('Something went wrong while submitting the test');
      },
    });
  }
}
