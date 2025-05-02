import { createReducer, on } from '@ngrx/store';
import { QuestionState } from './question.state';
import * as QuestionActions from './question.actions';

export const questionInitialState: QuestionState = {
  questions: [],
  currentQuestion: null,
  wrongQuestions: [],
  numberOfQuestions: 0,
  numberOfWrongQuestions: 0,
  loading: false,
  error: null,
  checkResult: null,
};

export const questionReducer = createReducer(
  questionInitialState,

  on(QuestionActions.loadQuestions, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(QuestionActions.loadQuestionsSuccess, (state, { questions }) => ({
    ...state,
    questions,
    numberOfQuestions: questions.length,
    loading: false,
  })),

  on(QuestionActions.loadQuestionsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(QuestionActions.setCurrentQuestion, (state, { question }) => ({
    ...state,
    currentQuestion: question,
  })),

  on(
    QuestionActions.updateQuestion,
    (state, { questionId, selectedAnswer }) => ({
      ...state,
      questions: state.questions.map((q) =>
        q._id === questionId ? { ...q, selectedAnswer } : q
      ),
    })
  ),

  on(QuestionActions.onNext, (state, { currentIndex }) => ({
    ...state,
    currentQuestion: state.questions[currentIndex + 1],
  })),

  on(QuestionActions.onBack, (state, { currentIndex }) => ({
    ...state,
    currentQuestion: state.questions[currentIndex - 1],
  })),

  on(QuestionActions.checkQuestion, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(QuestionActions.checkQuestionSuccess, (state, { result }) => ({
    ...state,
    checkResult: result,
    loading: false,
  })),

  on(QuestionActions.setWrongQuestions, (state) => ({
    ...state,
    wrongQuestions: state.questions.filter(
      (q) => q.correct !== q.selectedAnswer
    ),
    numberOfWrongQuestions: state.questions.filter(
      (q) => q.correct !== q.selectedAnswer
    ).length,
  })),

  on(QuestionActions.resetQuestionState, () => questionInitialState)
);
