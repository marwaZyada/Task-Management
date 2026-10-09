import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from '../../models/iauth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);
  private errorTimeout?: ReturnType<typeof setTimeout>;
  showPassword = false;
  apiError = signal('');

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      if (this.apiError()) {
        this.apiError.set('');
        clearTimeout(this.errorTimeout);
      }
    });
  }

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  signIn(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const loginData: LoginRequest = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };

    console.log(loginData);

    this.apiError.set('');

    this.authService.login(loginData).subscribe({
      next: (res) => {
        console.log(res);
        this.authService.saveSession(res, this.loginForm.value.rememberMe!);
        this.router.navigate(['/project']);
      },

      error: (error) => {
        this.apiError.set(error?.error?.msg);
        this.clearErrorAfterDelay();
      },
    });
  }

  // clear api error message
  private clearErrorAfterDelay(): void {
    clearTimeout(this.errorTimeout);

    this.errorTimeout = setTimeout(() => {
      this.apiError.set('');
    }, 3000);
  }

  // show/hide password
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
