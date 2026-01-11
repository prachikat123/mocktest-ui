import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestList } from '../components/mock-test/test-list/test-list';
import { TestSubject } from "../components/mock-test/test-subject/test-subject";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TestList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
