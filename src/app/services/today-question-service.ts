import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question';
import { Observable } from 'rxjs';
import { AuthService } from './auth';
import { addNewQuestion } from '../models/addNewQuestion';

@Injectable({
  providedIn: 'root',
})
export class TodayQuestionService {
  private baseUrl = 'http://localhost:8080/questions';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTodayQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/today`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  makeTodayQuestion(questionId: number): Observable<addNewQuestion> {
    return this.http.post<addNewQuestion>(
      `${this.baseUrl}/${questionId}/solve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }
}