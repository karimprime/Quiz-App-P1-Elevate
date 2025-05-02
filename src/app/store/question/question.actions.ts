import { createAction, props } from '@ngrx/store';
import {
  CheckedQuestionResponse,
  QuestionAdapt,
} from '../../core/interfaces/questions.interface';

// Load Questions
export const loadQuestions = createAction(
  '[Question] Load Questions',
  props<{ examId: string }>()
);

export const loadQuestionsSuccess = createAction(
  '[Question] Load Questions Success',
  props<{ questions: QuestionAdapt[] }>()
);

export const loadQuestionsFailure = createAction(
  '[Question] Load Questions Failure',
  props<{ error: string }>()
);

export const loadQuestionHistory = createAction(
  '[Question] Load Question History'
);

export const loadQuestionById = createAction(
  '[Question] Load Question By Id',
  props<{ questionId: string }>()
);

export const checkQuestion = createAction(
  '[Question] Check Question',
  props<{ questionId: string; answer: string }>()
);

export const checkQuestionSuccess = createAction(
  '[Question] Check Question Success',
  props<{ result: CheckedQuestionResponse }>()
);

export const setCurrentQuestion = createAction(
  '[Question] Set Current Question',
  props<{ question: QuestionAdapt }>()
);

export const updateQuestion = createAction(
  '[Question] Update Question',
  props<{ questionId: string; selectedAnswer: string }>()
);

export const onNext = createAction(
  '[Question] On Next',
  props<{ currentIndex: number }>()
);

export const onBack = createAction(
  '[Question] On Back',
  props<{ currentIndex: number }>()
);

export const setWrongQuestions = createAction('[Question] Set Wrong Questions');

export const resetQuestionState = createAction(
  '[Question] Reset Question State'
);
