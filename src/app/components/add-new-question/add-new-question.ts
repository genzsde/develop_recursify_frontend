import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addNewQuestion } from '../../models/addNewQuestion';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-add-new-question',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-new-question.html',
  styleUrls: ['./add-new-question.scss'],
})
export class AddNewQuestionComponent {

  userName: string | null = '';

  question: addNewQuestion = {
  title: '',
  description: '',
  questionNumber: 0,
  difficulty: 'EASY'
  };


  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.userName = localStorage.getItem('userName') || 'User';
  }

  submit() {
    this.successMessage = '';
    this.errorMessage = '';

    this.dashboardService.addQuestion(this.question).subscribe({
      next: () => {
        this.successMessage = '✅ Question added successfully';

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1200);
      },
      error: () => {
        this.errorMessage = '❌ Failed to add question';
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
