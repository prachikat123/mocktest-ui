import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './home/home';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { MatCardModule } from '@angular/material/card';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, MatCardModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})



export class App {
  protected readonly title = signal('sample-a20');
}
