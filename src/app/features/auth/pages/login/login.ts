import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from '../../models/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
   private readonly fb = inject(FormBuilder);
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);

 
  errorMessage = '';

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
const loginData:LoginRequest={
   email: this.loginForm.value.email!,
  password: this.loginForm.value.password!,
}

console.log(loginData);
  
    this.errorMessage = '';

    this.authService.login(loginData).subscribe({
      next: (res) => {
       console.log(res)
 this.authService.saveSession(
        res,
        this.loginForm.value.rememberMe!
      );
        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
       

        this.errorMessage =
          error.error?.message ??
          'Invalid email or password.';
      },
    });
  }
}
