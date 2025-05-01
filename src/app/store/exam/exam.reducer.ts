import { createReducer, on } from '@ngrx/store';
import { ExamState } from './exam.state';

import * as ExamActions from './exam.actions';

export const examInitialState: ExamState = {
  examStatus: 'Not Started',
  isExamModalOpen: false,
};

export const examReducer = createReducer(
  examInitialState,
  on(ExamActions.toggleModal, (state) => ({
    ...state,
    isExamModalOpen: !state.isExamModalOpen,
  }))
);
