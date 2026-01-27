import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestResultModel } from '../../../models/test-result.model';
import { MockTestService } from '../../../services/api/mock-test.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-result',
  imports: [CommonModule],
  templateUrl: './test-result.html',
  styleUrl: './test-result.scss',
})
export class TestResult implements OnInit{
  result!: TestResultModel;

  constructor(
    private mockTestService:MockTestService,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    const attemptId= Number(this.route.snapshot.paramMap.get('attemptId'));

    this.mockTestService.getResult(attemptId).subscribe(res=>{
      this.result=res;
    });
  }

  get percentage():number{
    return Math.round((this.result.correct/this.result.totalQuestions)* 100);
  }
}
