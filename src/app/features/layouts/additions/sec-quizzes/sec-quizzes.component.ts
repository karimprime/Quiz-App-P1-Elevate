// sec-quizzes.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sec-quizzes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sec-quizzes.component.html',
  styleUrl: './sec-quizzes.component.scss',
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class SecQuizzesComponent {
  @Input() quizCards: any[] = [];
  @Input() isLoading = false;
  @Input() hasLoadedAll = false;
  @Output() loadAll = new EventEmitter<void>();

  onLoadAllClick() {
    if (!this.isLoading && !this.hasLoadedAll) {
      this.loadAll.emit();
    }
  }
}
