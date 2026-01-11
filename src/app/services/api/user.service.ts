import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
   private readonly TOKEN_KEY = 'jwt_token';
   private readonly NAME_KEY='user_name';

  constructor() {}

  // Store token
  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  // Get token
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  //Store UserName
  setUserName(name:string):void{
    sessionStorage.setItem(this.NAME_KEY,name);
  }

  //Get UserName
  getUserName():string | null{
    return sessionStorage.getItem(this.NAME_KEY);
  }

  // Check login status
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Clear token (Logout)
  clearToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.NAME_KEY);
  }
}
