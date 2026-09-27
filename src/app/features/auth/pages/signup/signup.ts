import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Auth } from '../../../../core/services/auth';
import { SignupRequest } from '../../models/auth-service';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
   private readonly fb = inject(FormBuilder);
   private readonly authService = inject(Auth);
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
      console.log(response);
    },
    error: error => {
      console.error(error);
    },
  });
  }
}
