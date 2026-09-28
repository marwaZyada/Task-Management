import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Auth } from '../../../../core/services/auth';
import { SignupRequest } from '../../models/auth-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit{
   private readonly fb = inject(FormBuilder);
   private readonly authService = inject(Auth);
   private readonly router = inject(Router);
   apiError = signal('');
   showPassword = false;
   private errorTimeout?: ReturnType<typeof setTimeout>;

ngOnInit(): void {
      this.signupForm.valueChanges.subscribe(() => {
    if (this.apiError()) {
      this.apiError.set('');
      clearTimeout(this.errorTimeout);
    }
  });
}


   signupForm = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.nameValidator
        ],
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
department:
 [
        '',
       
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/
          ),
        ],
      ],

      confirmPassword: [
        '',
        Validators.required,
      ],
    },
    {
      validators: this.passwordMatchValidator,
    }
  );

  // name validator
 nameValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null;
  }

  // Letters + spaces only
  const namePattern = /^[\p{L}]+(?: [\p{L}]+)*$/u;

  return namePattern.test(value)
    ? null
    : { invalidName: true };
};

// matching password,confirm password
passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  }

  get name() {
    return this.signupForm.controls.name;
  }

  get email() {
    return this.signupForm.controls.email;
  }

    get department() {
    return this.signupForm.controls.department;
  }

  get password() {
    return this.signupForm.controls.password;
  }

  get confirmPassword() {
    return this.signupForm.controls.confirmPassword;
  }

  onSubmit(): void {
    this.apiError.set('');
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

  const formValue = this.signupForm.getRawValue();

  const signupData: SignupRequest = {
    email: formValue.email!,
    password: formValue.password!,
    data: {
      name: formValue.name!,
       ...(formValue.department?.trim()
      ? { department: formValue.department.trim() }
      : {}),
    },
  };
  console.log(signupData)

  this.authService.signup(signupData).subscribe({
    next: response => {
       this.router.navigate(['/login']);
      console.log(response);
    },
    error: error => {
       this.apiError.set(error?.error?.msg);
          this.clearErrorAfterDelay();
      console.error(this.apiError());
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

// password restriction 
get hasMinLength(): boolean {
  return (this.password.value?.length ?? 0) >= 8;
}

get hasUppercaseLowercaseAndDigit(): boolean {
  const password = this.password.value ?? '';

  return (
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

get hasSpecialCharacter(): boolean {
  const password = this.password.value ?? '';

  return /[^A-Za-z0-9]/.test(password);
}
}
