import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './home/home';
import { AuthGuard } from './services/guard/auth-guard';
import { LoginGuard } from './services/guard/login.guard';
import { TestSubject } from './components/mock-test/test-subject/test-subject';
import { TestAttempt } from './components/mock-test/test-attempt/test-attempt';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [LoginGuard] },
  {
    path: 'home',
    component: Home,
    canActivate: [AuthGuard]
  },
  {path: 'mock-test', component: TestAttempt, canActivate: [AuthGuard] },
  // { path: 'subjects', component: TestSubject, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
