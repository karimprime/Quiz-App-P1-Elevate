import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import {
  map,
  switchMap,
  catchError,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';
import * as ExamActions from '@examStore/exam.actions';
import * as QuestionActions from './question.actions';
import * as QuestionSelectors from './question.selector';
import { QuestionsService } from '../../shared/services/questions/questions.service';
import { Store } from '@ngrx/store';

@Injectable()
export class QuestionsEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _questionsService = inject(QuestionsService);
  private readonly _store = inject(Store);

  loadQuestions$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuestionActions.loadQuestions),
      switchMap(({ examId }) =>
        this._questionsService.allQuestionsOnExam(examId).pipe(
          map((response) =>
            QuestionActions.loadQuestionsSuccess({
              questions: response.questions,
            })
          ),
          catchError((error) =>
            of(QuestionActions.loadQuestionsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadQuestionHistory$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuestionActions.loadQuestionHistory),
      switchMap(() =>
        this._questionsService.getQuestionHistory().pipe(
          map((response) =>
            QuestionActions.loadQuestionsSuccess({
              questions: response.questions,
            })
          ),
          catchError((error) =>
            of(QuestionActions.loadQuestionsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadQuestionById$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuestionActions.loadQuestionById),
      switchMap(({ questionId }) =>
        this._questionsService.getQuestionById(questionId).pipe(
          map((response) =>
            QuestionActions.setCurrentQuestion({
              question: response.questions[0],
            })
          ),
          catchError((error) =>
            of(QuestionActions.loadQuestionsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  checkQuestion$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuestionActions.checkQuestion),
      switchMap(({ questionId, answer }) =>
        this._questionsService.checkQuestion(questionId, answer).pipe(
          map((result) => QuestionActions.checkQuestionSuccess({ result })),
          catchError((error) =>
            of(QuestionActions.loadQuestionsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  setQuestionsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuestionActions.loadQuestionsSuccess),
      map(() => {
        return ExamActions.updateExamStatus({ status: 'Started' });
      })
    )
  );

  setCurrentQuestionEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuestionActions.setCurrentQuestion),
      map(() => ExamActions.toggleModal())
    )
  );

  setWrongQuestionsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuestionActions.setWrongQuestions),
      withLatestFrom(this._store.select(QuestionSelectors.selectQuestions)),
      tap(([_, dataList]) => {
        console.log('========= Result ===========');
        console.log(dataList);
      }),
      map(() => ExamActions.updateExamStatus({ status: 'Completed' }))
    )
  );
}
