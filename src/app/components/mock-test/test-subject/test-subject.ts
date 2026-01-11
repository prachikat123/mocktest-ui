import { Component, OnInit } from '@angular/core';
import { Subject } from '../../../models/subject.model';
import { MatCard, MatCardModule } from '@angular/material/card';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MockTestService } from '../../../services/api/mock-test.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LevelDialog } from '../level-dialog/level-dialog';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-test-subject',
  imports: [NgForOf, MatCardModule, MatButtonModule,MatDialogModule,MatRadioModule,FormsModule],
  templateUrl: './test-subject.html',
  styleUrl: './test-subject.scss',
})
export class TestSubject implements OnInit {
  subjects: Subject[] = [];
  
  constructor(
    private mockTestService: MockTestService,
    private dialog:MatDialog,
    private router: Router) {}

  ngOnInit(): void {
    this.mockTestService.getActiveSubjects().subscribe({
      next: (res) => {
        this.subjects = res;
        console.log('Subjects:', res);
      },
      error: (err) => {
        console.error('Error loading subjects', err);
      },
    });
  }
  openSubject(subjectId: number) {
    const dialogRef =this.dialog.open(LevelDialog,{
      width:'350px',
      data:{subjectId}
    });


    dialogRef.afterClosed().subscribe(level =>{
      if(level){
        this.router.navigate(['/mock-test'],{
          queryParams:{
            subjectId:subjectId,
            levelId:level
          }
        });
      }
    });
   
  }

}

