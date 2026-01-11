import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient, private userService: UserService) {}

  public login(email: string, password: string): Observable<{ token: string; name: string }> {
    return this.http.post<{ token: string; name: string }>(
      'https://localhost:8081/api/Auth/login',
      { email: email, password: password }
    );
  }
  public logout(): Observable<string> {
    let token;
    if (this.userService.isLoggedIn()) {
      token = this.userService.getToken();
    } else {
      throw Error('Token not found');
    }

    return this.http.post<string>(
      'https://localhost:8081/api/Auth/logout',
      {},
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }
  public register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>('https://localhost:8081/api/User/register', {
      name: name,
      email: email,
      password: password,
    });
  }
}
