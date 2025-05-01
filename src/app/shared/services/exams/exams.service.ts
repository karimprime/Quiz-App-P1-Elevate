import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environment/environment.prod';
import { MainAPIAdapter } from '../../../core/adapter/main-adapter';
import { Endpoints } from '../../../core/enums/endpoints';
import {
  ExamsAdaptResponse,
  ExamsResponse,
  Exam,
  CreateExamRequest,
} from '../../../core/interfaces/exam.interface';
import { ErrorResponse } from '../../../core/interfaces/errors';

@Injectable({
  providedIn: 'root',
})
export class ExamsService {
  private _httpClient = inject(HttpClient);
  private readonly _mainAPIAdapter = inject(MainAPIAdapter);

  createExam(examData: CreateExamRequest): Observable<Exam> {
    return this._httpClient
      .post<Exam>(environment.baseApiUrl + '/' + Endpoints.Exams, examData)
      .pipe(catchError((err: ErrorResponse) => throwError(() => err)));
  }

  getAllExams(): Observable<ExamsAdaptResponse> {
    return this._httpClient
      .get<ExamsResponse>(environment.baseApiUrl + '/' + Endpoints.Exams)
      .pipe(
        map((res: ExamsResponse) => this._mainAPIAdapter.examAdapter(res)),
        catchError((err: ErrorResponse) => throwError(() => err))
      );
  }

  getExamsBySubject(subjectId: string): Observable<ExamsAdaptResponse> {
    return this._httpClient
      .get<ExamsResponse>(
        environment.baseApiUrl + '/' + Endpoints.ExamsBySubject + subjectId
      )
      .pipe(
        map((res: ExamsResponse) => this._mainAPIAdapter.examAdapter(res)),
        catchError((err: ErrorResponse) => throwError(() => err))
      );
  }

  getExamById(examId: string): Observable<Exam> {
    return this._httpClient
      .get<Exam>(environment.baseApiUrl + '/' + Endpoints.ExamsByID + examId)
      .pipe(catchError((err: ErrorResponse) => throwError(() => err)));
  }
}
