import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { RouterLink } from '@angular/router';
import { LoginDto } from '../../../models/loginDto';
import { AuthResponseDto } from '../../../models/authResponseDto';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const dto: LoginDto = { email: this.email, password: this.password };
    this.authService.login(dto).subscribe({
      next: (res: AuthResponseDto) => {
        this.authService.saveToken(res.token);
        localStorage.setItem('userName', res.name);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => this.errorMsg = err.error?.message || 'Login failed'
    });
  }
}
