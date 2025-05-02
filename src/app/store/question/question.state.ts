import {
  CheckedQuestionResponse,
  QuestionAdapt,
} from '../../core/interfaces/questions.interface';

export interface QuestionState {
  questions: QuestionAdapt[];
  currentQuestion: QuestionAdapt | null;
  wrongQuestions: QuestionAdapt[];
  numberOfQuestions: number;
  numberOfWrongQuestions: number;
  loading: boolean;
  error: string | null;
  checkResult: CheckedQuestionResponse | null;
}
