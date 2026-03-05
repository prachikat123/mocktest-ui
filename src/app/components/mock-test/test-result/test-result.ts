import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestResultModel } from '../../../models/test-result.model';
import { MockTestService } from '../../../services/api/mock-test.service';
import { CommonModule } from '@angular/common';
import { QuestionResultModel } from '../../../models/question-result.model';
import { QuestionModel } from '../../../models/question.model';

@Component({
  selector: 'app-test-result',
  imports: [CommonModule],
  templateUrl: './test-result.html',
  styleUrl: './test-result.scss',
})
export class TestResult implements OnInit {
  result!: TestResultModel;
  attemptedQuestions: QuestionResultModel[] = [];
  notAttemptedQuestions: QuestionResultModel[] = [];
  notAttemptedCount = 0;
  selectedQuestion = {} as QuestionResultModel;

  constructor(
    private mockTestService: MockTestService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadResult();
  }
  loadResult() {
    const attemptId = Number(this.route.snapshot.paramMap.get('attemptId'));
    this.mockTestService.getResult(attemptId).subscribe((res) => {
      this.result = res;
      console.log('RESULT API DATA :', res);
      this.attemptedQuestions = res.questionResults ?? [];
      this.notAttemptedQuestions = res.notAttemptedQuestions;
      this.notAttemptedCount = res.totalQuestions - res.questionResults.length;
    });
  }

  get percentage(): number {
    if (!this.result?.totalQuestions) return 0;
    return Math.round((this.result.correct / this.result.totalQuestions) * 100);
  }

  showAnswer(question: any) {
    if (question.correctAnswer) {
      this.selectedQuestion = question;
    }
  }

  closePopup() {
    this.selectedQuestion = {} as QuestionResultModel;
  }
}
