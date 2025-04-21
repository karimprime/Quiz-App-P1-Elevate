import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  private httpClient = inject(HttpClient);
  private cache = new Map<number, Observable<any>>();

  getAllPSubjects(numSubjects: number = 10): Observable<any> {
    if (!this.cache.has(numSubjects)) {
      this.cache.set(
        numSubjects,
        this.httpClient
          .get<any>(
            `https://exam.elevateegy.com/api/v1/subjects?limit=${numSubjects}`
          )
          .pipe(shareReplay(1))
      );
    }
    return this.cache.get(numSubjects)!;
  }
}
