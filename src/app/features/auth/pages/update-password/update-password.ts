import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../../core/services/auth';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-password',
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './update-password.html',
  styleUrl: './update-password.css',
})
export class UpdatePassword {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(Auth);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoading = signal(false);
  readonly showPassword = signal(false);
  readonly showConfirmPassword = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly accessToken = signal('');

  readonly form = this.fb.nonNullable.group({
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[a-z]/),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/[0-9]/),
        Validators.pattern(/[^A-Za-z0-9]/),
      ],
    ],
    confirmPassword: ['', Validators.required],
  });

  constructor() {
    // Supabase recovery links commonly return the token in the URL fragment.
    this.route.fragment
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((fragment) => {
        const params = new URLSearchParams(fragment ?? '');
        const token = params.get('access_token');
        const type = params.get('type');

        if (token && type === 'recovery') {
          this.accessToken.set(token);
        }
      });
  }

  get password() {
    return this.form.controls.password;
  }

  get confirmPassword() {
    return this.form.controls.confirmPassword;
  }

  hasRequirement(pattern: RegExp): boolean {
    return pattern.test(this.password.value);
  }

  get passwordsMatch(): boolean {
    return (
      this.password.value.length > 0 &&
      this.password.value === this.confirmPassword.value
    );
  }

  updatePassword(): void {
    this.form.markAllAsTouched();
    this.errorMessage.set('');
    this.successMessage.set('');

    if (this.form.invalid) {
      return;
    }

    if (!this.passwordsMatch) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    if (!this.accessToken()) {
      this.errorMessage.set(
        'Your reset link is invalid or expired. Please request a new one.',
      );
      return;
    }

    this.isLoading.set(true);

    this.authService
      .updatePassword(this.password.value,this.accessToken())
      .pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: () => {
          this.successMessage.set(
            'Your password has been updated successfully.',
          );

          this.form.reset();

          setTimeout(() => {
            void this.router.navigate(['/auth/login']);
          }, 1500);
        },
        error: (error) => {
          this.errorMessage.set(
            error?.error?.msg ??
              error?.error?.message ??
              'Unable to update your password. Please try again.',
          );
        },
      });
  }
}
