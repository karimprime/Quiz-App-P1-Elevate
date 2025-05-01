import { Component } from '@angular/core';
import { QuestionsComponent } from '../../layouts/additions/questions/questions.component';

@Component({
  selector: 'app-exams',
  imports: [QuestionsComponent],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent {
  isQuizStarted = false;

  startQuiz() {
    this.isQuizStarted = true;
  }

  completeQuiz() {
    this.isQuizStarted = false;
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
