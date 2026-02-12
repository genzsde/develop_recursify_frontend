import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Question } from '../../models/question';
import { DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Ensuring standalone flag is present if using imports
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {
  userName: string | null = '';
  questions: Question[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
private cdr: ChangeDetectorRef,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.userName = localStorage.getItem('userName') || 'User';
    this.loadQuestions();
  }

  loadQuestions() {
    this.loading = true;
    this.dashboardService.allQuestions().subscribe({
      next: (res: Question[]) => {
        this.questions = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load questions:', err);
        this.error = 'Failed to load questions';
        this.loading = false;
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}