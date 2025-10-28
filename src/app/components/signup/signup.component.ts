import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserServiceService } from 'app/user-service.service';
import { User } from 'app/user';

@Component({
    selector: 'app-signup',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  submitSuccess = false;

  constructor(private fb: FormBuilder, private userService: UserServiceService) {
    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    return hasUpper && hasLower && hasNumber ? null : { passwordStrength: true };
  }

  // Confirm password validator
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  // Toggle password visibility
  togglePasswordVisibility(field: string): void {
    if (field === 'password') this.showPassword = !this.showPassword;
    else this.showConfirmPassword = !this.showConfirmPassword;
  }

 
  onSubmit(): void {
    if (this.signupForm.valid) {
      const user: User = this.signupForm.value;
      delete user.confirmPassword; 

      this.userService.save(user).subscribe({
        next: (res) => {
          console.log('User saved:', res);
          this.submitSuccess = true;

          setTimeout(() => {
            this.submitSuccess = false;
            this.signupForm.reset();
          }, 3000);
        },
        error: (err) => console.error('Error saving user:', err)
      });
    } else {
      // mark all fields as touched to show errors
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }

  // Helpers
  get f() { return this.signupForm.controls; }

  isFieldInvalid(name: string): boolean {
    const field = this.signupForm.get(name);
    return !!(field && field.invalid && (field.touched || field.dirty));
  }

  isFieldValid(name: string): boolean {
    const field = this.signupForm.get(name);
    return !!(field && field.valid && (field.touched || field.dirty));
  }
}
