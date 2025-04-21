import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-questions',
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent {

  @Output() quizClosed = new EventEmitter<void>();
  quizStarted = false;

  startQuiz() {
    this.quizStarted = true;
  }

  onClose() {
    if (confirm('Are you sure you want to quit the quiz?')) {
      this.quizClosed.emit();
    }
  }
}
