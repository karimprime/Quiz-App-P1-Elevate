import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  imports: [],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.scss',
})
export class CustomModalComponent {
  @Output() modalClosed = new EventEmitter<void>();
  @Output() examStarted = new EventEmitter<void>();

  closeModal() {
    this.modalClosed.emit();
  }

  startExam() {
    this.examStarted.emit();
  }
}
