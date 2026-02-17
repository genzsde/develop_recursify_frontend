import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question';
import { Observable } from 'rxjs';
import { addNewQuestion } from '../models/addNewQuestion';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = 'http://localhost:8080/questions';

  constructor(private http: HttpClient, private authService: AuthService) {}

  allQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseUrl);
  }

  getQuestionById(id:number): Observable<Question> {
  return this.http.get<Question>(`${this.baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${this.authService.getToken()}`,
    },
  })
}

  addQuestion(question: addNewQuestion): Observable<addNewQuestion> {
    return this.http.post<addNewQuestion>(this.baseUrl, question);
  }

  deleteQuestion(questionId: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${questionId}`, {
      responseType: 'text'
    });
  }
}
