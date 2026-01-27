import { Component, OnInit } from '@angular/core';
import { MockTestService } from '../../../services/api/mock-test.service';
import { Router } from '@angular/router';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MockTestModel } from '../../../models/mock-test.model';

@Component({
  selector: 'app-test-list',
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './test-list.html',
  styleUrl: './test-list.scss',
})
export class TestList implements OnInit {
  tests: MockTestModel[] = [];
  filteredTests: MockTestModel[] = [];
  subjects: string[] = [];
  levels: string[] = [];
  selectedLevel: string = '';
  selectedSubject: string = '';

  constructor(private service: MockTestService, private router: Router) {}

  ngOnInit(): void {
    this.service.getActiveTests().subscribe({
      next: (res: any) => {
        console.log('Tests API response:', res);
        this.tests = res;
        this.setDistinctSubjectsAndLevels(res);
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error loading Tests', err);
      },
    });
  }

  setDistinctSubjectsAndLevels(tests: MockTestModel[]): void {
  this.subjects = ['']; // empty string first
  this.levels = [''];

  const subjectSet = new Set<string>();
  const levelSet = new Set<string>();

  tests.forEach(test => {
    if (!subjectSet.has(test.subjectName)) {
      subjectSet.add(test.subjectName);
      this.subjects.push(test.subjectName);
    }

    if (!levelSet.has(test.levelName)) {
      levelSet.add(test.levelName);
      this.levels.push(test.levelName);
    }
  });
}


  loadTests() {
    this.service.getAllTests().subscribe({
      next: (res: any) => {
        this.tests = res;
        console.log('Tests :', this.tests);
      },
      error: (err) => {
        console.error('Error loading tests', err);
      },
    });
  }

  startTest(test: MockTestModel) {
    // this.service.startTest(test.testId).subscribe(() => {
      this.router.navigate(['/mock-test'], {
        queryParams: {
          testId: test.testId,
          subjectId: test.subjectId,
          levelId: test.levelId,
          duration: test.durationInMinutes,
        }
      });
    // });
  }

  filterByLevel(level: string) {
    this.selectedLevel = level;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredTests = this.tests.filter(
      (t) =>
        (!this.selectedLevel || t.levelName === this.selectedLevel) &&
        (!this.selectedSubject || t.subjectName === this.selectedSubject)
    );
  }
}
