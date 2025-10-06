import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserServiceService } from 'app/user-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  loginSuccess = false;
  loginError: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.userService.login(username, password).subscribe({
        next: (res: {
          accessToken: string; refreshToken: string; 
        }) => {
          console.log('Login success:', res);
          // localStorage.setItem('token', res.token);
          localStorage.setItem('AccessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);

          this.loginSuccess = true;

          // setTimeout(() => {
          //   this.loginSuccess = false;
          //   this.router.navigate(['/home']); 
          // }, 1500);
        },
        error: (err: any) => {
          console.error('Login failed:', err);
          alert('Invalid username or password');
        }
      });
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched) && field.value);
  }
}
