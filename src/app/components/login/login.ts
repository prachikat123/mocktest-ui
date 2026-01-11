import { Component } from '@angular/core';
import { CommonModule, formatCurrency } from '@angular/common';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/api/auth.service';
import{Router} from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/api/user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(
    private authService: AuthService,
    private router:Router,
    private userService: UserService
  ){}

  isSignup: boolean = false;

  showSignup() {
    this.isSignup = true;
  }

  showLogin() {
    this.isSignup = false;
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  onSumbmit() {
    if (this.loginForm.invalid)
      return;

    console.log(this.loginForm.value);
    this.authService
      .login(this.loginForm.value?.email as string, this.loginForm.value['password'] as string)
      .subscribe({
        next: (res) => {
          console.log('LOGIN RESPONSE:',res);
          this.userService.setToken(res.token);
          this.userService.setUserName(res.name);
          Swal.fire({
            icon:'success',
            title:'Login Successful',
            text:'Welcome back!',
            timer:3000,
            showConfirmButton:false
          });
          this.router.navigate(['/home']);
        },
        error: (err) => {
          Swal.fire({
            icon:'error',
            title:'Login Failed',
            text:err.error || 'Invalid email or Password'
          });
        },
      });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }


  signupForm = new FormGroup(
    {
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ]),
      CnfmPass: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('Password')?.value;
    const confirmPassword = form.get('CnfmPass')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  signUp() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    console.log(this.signupForm.value);
    this.authService
      .register(
        this.signupForm.value?.Name as string,
        this.signupForm.value?.Email as string,
        this.signupForm.value['Password'] as string
      )
      .subscribe ({
        next:(res)=>{
          Swal.fire({
            icon:'success',
            title:'Registration Successful',
            text:'You can now login',
            confirmButtonText:'OK'
          });
        },
        error:(err)=>{
          Swal.fire({
            icon:'error',
            title:'Registration Failed',
            text:'Something went Wrong'
          });
        }
      });
        
      
  }
  get Name() {
    return this.signupForm.get('Name');
  }
  get Email() {
    return this.signupForm.get('Email');
  }
  get Password() {
    return this.signupForm.get('Password');
  }
  get CnfmPass() {
    return this.signupForm.get('CnfmPass');
  }
}
