export type examStatus =
  | 'Not Started'
  | 'Started'
  | 'Completed'
  | 'Review Answers'
  | 'Closed';

export interface ExamState {
  examStatus: examStatus;
  isExamModalOpen: boolean;
}
