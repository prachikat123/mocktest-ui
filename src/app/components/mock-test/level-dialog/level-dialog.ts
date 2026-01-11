import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-level-dialog',
  standalone:true,
  imports: [MatRadioModule,MatButtonModule,FormsModule,MatDialogModule],
  templateUrl: './level-dialog.html',
  styleUrl: './level-dialog.scss',
})
export class LevelDialog {
  levels =['Beginner','Medium','Hard'];
  selectedLevel='';


  constructor(
    public  dialogRef: MatDialogRef<LevelDialog>,
    @Inject(MAT_DIALOG_DATA) public data:{subjectId:number},
    private router: Router
  ){}

  onContinue():void{
    this.dialogRef.close(this.selectedLevel);
  }

  close(){
    this.dialogRef.close();
  }
}
