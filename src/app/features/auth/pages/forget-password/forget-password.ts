import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder,  ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, interval, take } from 'rxjs';
import { Auth } from '../../../../core/services/auth';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, RouterLink,CommonModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
})
export class ForgetPassword {
    private readonly fb = inject(FormBuilder);
  private readonly authService = inject(Auth);
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoading = signal(false);
  readonly isSubmitted = signal(false);
  readonly errorMessage = signal('');
  readonly countdown = signal(0);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get email() {
    return this.form.controls.email;
  }

  sendResetLink(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid || this.isLoading()) {
      return;
    }

    if (this.isSubmitted() && this.countdown() > 0) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService
      .forgotPassword(this.email.value.trim())
      .pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: () => {
          this.isSubmitted.set(true);
          this.startCountdown();
        },
        error: (error) => {
          this.errorMessage.set(
            error?.error?.msg ??
              error?.error?.message ??
              'Unable to send the reset link. Please try again.',
          );
        },
      });
  }

  private startCountdown(): void {
    this.countdown.set(300);

    interval(1000)
      .pipe(
        take(300),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.countdown.update((seconds) => Math.max(0, seconds - 1));
      });
  }

  get countdownText(): string {
    const minutes = Math.floor(this.countdown() / 60);
    const seconds = this.countdown() % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}
