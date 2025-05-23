import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { ExamsService } from '../../../shared/services/exams/exams.service';
import { SubmitButtonComponent } from '../../../shared/components/ui/submit-button/submit-button.component';
import { Store } from '@ngrx/store';
import * as ExamActions from '@examStore/exam.actions';
import * as ExamSelector from '@examStore/exam.selector';
import { CustomModalComponent } from '../../../shared/components/ui/custom-modal/custom-modal.component';
import { examStatus } from '@examStore/exam.state';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    RouterModule,
    SubmitButtonComponent,
    RouterLink,
    CustomModalComponent,
  ],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent implements OnInit, OnDestroy {
  isQuizStarted = signal(false);
  exams = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  private routeSub!: Subscription;
  subjectId: string | null = null;

  private examsService = inject(ExamsService);
  private route = inject(ActivatedRoute);
  private readonly _store = inject(Store);

  isOpen = this._store.selectSignal(ExamSelector.selectExamModal);

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.subjectId = params['subjectId'];
      if (this.subjectId) {
        this.loadExams(this.subjectId);
      } else {
        this.error.set('No subject ID provided');
      }
    });

    this._store
      .select(ExamSelector.selectExamModal)
      .pipe(
        tap((isOpen) => {
          this.isQuizStarted.set(isOpen);
          console.log('Modal state changed:', isOpen);
        })
      )
      .subscribe();
  }

  loadExams(subjectId: string) {
    this.loading.set(true);
    this.error.set(null);
    this.exams.set([]);

    this.examsService.getExamsBySubject(subjectId).subscribe({
      next: (response) => {
        this.exams.set(response?.exams || []);
        console.log('Exams loaded:', this.exams());
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load exams. Please try again later.');
        this.loading.set(false);
        console.error('Error loading exams:', err);
      },
    });
  }

  startExam() {
    this._store.dispatch(ExamActions.toggleModal());
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
