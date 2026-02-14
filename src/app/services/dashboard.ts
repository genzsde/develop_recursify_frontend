import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question';
import { Observable } from 'rxjs';
import { AuthService } from './auth';
import { addNewQuestion } from '../models/addNewQuestion';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = 'http://localhost:8080/questions';

  constructor(private http: HttpClient, private authService: AuthService) {}

  allQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });

  }

  addQuestion(question: addNewQuestion): Observable<addNewQuestion> {
    return this.http.post<addNewQuestion>(this.baseUrl, question, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  deleteQuestion(questionId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${questionId}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
      responseType: 'text' as 'json'
    });
  }

}
