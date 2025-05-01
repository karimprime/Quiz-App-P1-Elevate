import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../core/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ExamsService {
  private httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.baseApiUrl}/exams`;

  createExam(examData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, examData);
  }

  getAllExams(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl);
  }

  getExamsBySubject(subjectId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}?subject=${subjectId}`);
  }

  getExamById(examId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${examId}`);
  }
}
