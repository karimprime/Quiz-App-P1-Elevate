import { inject, Injectable } from '@angular/core';
import { QuestionsAPI } from '../../../core/base/question-apis';
import { HttpClient } from '@angular/common/http';
import { MainAPIAdapter } from '../../../core/adapter/main-adapter';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  QuestionsAdaptResponse,
  QuestionsResponse,
  CheckedQuestionResponse,
} from '../../../core/interfaces/questions.interface';
import { environment } from '../../../environment/environment.prod';
import { Endpoints } from '../../../core/enums/endpoints';
import { ErrorResponse } from '../../../core/interfaces/errors';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService implements QuestionsAPI {
  private readonly _httpClient = inject(HttpClient);
  private readonly _mainAPIAdapter = inject(MainAPIAdapter);

  allQuestions(): Observable<QuestionsAdaptResponse> {
    return this._httpClient
      .get<QuestionsResponse>(
        `${environment.baseApiUrl}/${Endpoints.Questions}`
      )
      .pipe(
        map((res: QuestionsResponse) =>
          this._mainAPIAdapter.questionAdapter(res)
        ),
        catchError((err: ErrorResponse) => throwError(() => err))
      );
  }

  allQuestionsOnExam(examId: string): Observable<QuestionsAdaptResponse> {
    return this._httpClient
      .get<QuestionsResponse>(
        `${environment.baseApiUrl}/${Endpoints.Questions}?exam=${examId}`
      )
      .pipe(
        map((res: QuestionsResponse) =>
          this._mainAPIAdapter.questionAdapter(res)
        ),
        catchError((err: ErrorResponse) => throwError(() => err))
      );
  }

  getQuestionHistory(): Observable<QuestionsAdaptResponse> {
    return this._httpClient
      .get<QuestionsResponse>(
        `${environment.baseApiUrl}/${Endpoints.Questions}/history`
      )
      .pipe(
        map((res: QuestionsResponse) =>
          this._mainAPIAdapter.questionAdapter(res)
        ),
        catchError((err: ErrorResponse) => throwError(() => err))
      );
  }

  getQuestionById(questionId: string): Observable<QuestionsAdaptResponse> {
    return this._httpClient
      .get<QuestionsResponse>(
        `${environment.baseApiUrl}/${Endpoints.Questions}/${questionId}`
      )
      .pipe(
        map((res: QuestionsResponse) =>
          this._mainAPIAdapter.questionAdapter(res)
        ),
        catchError((err: ErrorResponse) => throwError(() => err))
      );
  }

  checkQuestion(
    questionId: string,
    answer: string
  ): Observable<CheckedQuestionResponse> {
    return this._httpClient
      .post<CheckedQuestionResponse>(
        `${environment.baseApiUrl}/${Endpoints.Questions}/check`,
        { questionId, answer }
      )
      .pipe(catchError((err: ErrorResponse) => throwError(() => err)));
  }
}
