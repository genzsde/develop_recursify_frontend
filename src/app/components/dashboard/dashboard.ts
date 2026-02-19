import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Question } from '../../models/question';
import { DashboardService } from '../../services/dashboard';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {
  userName: string | null = '';
  questions: Question[] = [];
  loading: boolean = true;
  error: string | null = null;
  showConfirm = false;
  deleteId: number | null = null;

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
        console.log(res);
      },
      error: (err) => {
        console.error('Failed to load questions:', err);
        this.error = 'Failed to load questions';
        this.loading = false;
      },
    });
  }


//deleting the question from the dashboard - direct way
//   deleteQuestion(id: number) {
//   this.dashboardService.deleteQuestion(id).subscribe({
//     next: () => {
//       this.loadQuestions();  // re-fetch from backend
//     }
//   });
// }

openDeletePopup(id: number) {
  this.deleteId = id;
  this.showConfirm = true;
}

cancelDelete() {
  this.showConfirm = false;
  this.deleteId = null;
}

confirmDelete() {
  if (this.deleteId === null) return;

  this.dashboardService.deleteQuestion(this.deleteId).subscribe({
    next: () => {
      this.loadQuestions();
      this.showConfirm = false;
      this.deleteId = null;
    }
  });
}



  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // goToAddQuestion() {
  // this.router.navigate(['/add-question']);
  // }

  goToTodayQuestion() {
    this.router.navigate(['/today-question']);
  }

}
