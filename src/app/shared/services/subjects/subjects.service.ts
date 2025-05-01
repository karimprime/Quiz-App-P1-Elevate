import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../core/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  private httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.baseApiUrl}/subjects`;

  getAllPSubjects(numSubjects: number = 10): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}?limit=${numSubjects}`);
  }

  getSubjectById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${id}`);
  }

  createSubject(subjectData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, subjectData);
  }

  updateSubject(id: string, subjectData: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/${id}`, subjectData);
  }

  deleteSubject(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/${id}`);
  }
}
