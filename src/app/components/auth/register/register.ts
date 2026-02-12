import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { RouterLink } from '@angular/router';
import { RegisterDto } from '../../../models/registerDto';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const dto: RegisterDto = { name: this.name, email: this.email, password: this.password };
    this.authService.register(dto).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => this.errorMsg = err.error?.message || 'Registration failed'
    });
  }
}
