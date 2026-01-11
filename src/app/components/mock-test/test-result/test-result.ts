import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-result',
  imports: [],
  templateUrl: './test-result.html',
  styleUrl: './test-result.scss',
})
export class TestResult {
  result: any;

  constructor(private router: Router){
    this.result=this.router.getCurrentNavigation()?.extras.state;
  }
}
