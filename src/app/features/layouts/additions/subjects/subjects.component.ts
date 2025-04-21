import { Component } from '@angular/core';
import { QuestionsComponent } from '../questions/questions.component';

@Component({
  selector: 'app-subjects',
  imports: [QuestionsComponent],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
})
export class SubjectsComponent {
  isQuizStarted = false;

  startQuiz() {
    this.isQuizStarted = true;
  }

  completeQuiz() {
    this.isQuizStarted = false;
    // Handle quiz completion logic
    alert('Quiz completed!');
  }

  closeQuiz() {
    if (
      confirm(
        'Are you sure you want to quit the quiz? Your progress will be lost.'
      )
    ) {
      this.isQuizStarted = false;
    }
  }
}
