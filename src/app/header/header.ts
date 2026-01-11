import { Component } from '@angular/core';
import { UserService } from '../services/api/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/api/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router
  ) {}

  get userName():string | null{
    return this.userService.getUserName();
  }

  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.handleLogout();
      },
      error: (err) => {
        console.warn('Logout API failed, clearing session anyway', err);
        this.handleLogout(); // fail-safe logout
      },
    });
  }

  private handleLogout() {
    this.userService.clearToken();
    this.router.navigate(['/login']);
  }
}
