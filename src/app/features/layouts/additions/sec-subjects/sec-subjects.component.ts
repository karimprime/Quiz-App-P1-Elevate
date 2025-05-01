import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-sec-subjects',
  imports: [RouterLink],
  templateUrl: './sec-subjects.component.html',
  styleUrl: './sec-subjects.component.scss',
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class SecSubjectsComponent {
  @Input() quizCards: any[] = [];
  @Input() quiz: any[] = [];
  @Input() isLoading = false;
  @Input() hasLoadedAll = false;
  @Output() loadAll = new EventEmitter<void>();

  onLoadAllClick() {
    if (!this.isLoading && !this.hasLoadedAll) {
      this.loadAll.emit();
    }
  }
}
