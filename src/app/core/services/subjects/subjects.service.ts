import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  private httpClient = inject(HttpClient);
  private cache = new Map<string | number, Observable<any>>();

  getAllPSubjects(numSubjects: number = 10): Observable<any> {
    const cacheKey = `all_${numSubjects}`;
    if (!this.cache.has(cacheKey)) {
      this.cache.set(
        cacheKey,
        this.httpClient
          .get<any>(
            `https://exam.elevateegy.com/api/v1/subjects?limit=${numSubjects}`
          )
          .pipe(shareReplay(1))
      );
    }
    return this.cache.get(cacheKey)!;
  }

  getSubjectById(id: string): Observable<any> {
    if (!this.cache.has(id)) {
      this.cache.set(
        id,
        this.httpClient
          .get<any>(`https://exam.elevateegy.com/api/v1/exams${id}`)
          .pipe(shareReplay(1))
      );
    }
    return this.cache.get(id)!;
  }
}
