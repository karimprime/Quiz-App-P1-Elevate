import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { QuestionsComponent } from '../../layouts/additions/questions/questions.component';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExamsService } from '../../../shared/services/exams/exams.service';
import { SubmitButtonComponent } from '../../../shared/components/ui/submit-button/submit-button.component';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    QuestionsComponent,
    RouterModule,
    SubmitButtonComponent,
    RouterLink,
  ],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent implements OnInit, OnDestroy {
  isQuizStarted = false;
  exams: any[] = [];
  loading = false;
  error: string | null = null;
  private routeSub!: Subscription;
  subjectId: string | null = null;

  private examsService = inject(ExamsService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.subjectId = params['subjectId'];
      if (this.subjectId) {
        this.loadExams(this.subjectId);
      } else {
        this.error = 'No subject ID provided';
      }
    });
  }

  loadExams(subjectId: string) {
    this.loading = true;
    this.error = null;
    this.exams = [];

    this.examsService.getExamsBySubject(subjectId).subscribe({
      next: (response) => {
        this.exams = response?.exams || [];
        console.log('Exams loaded:', this.exams);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load exams. Please try again later.';
        this.loading = false;
        console.error('Error loading exams:', err);
      },
    });
  }

  startQuiz(examId: string) {
    this.isQuizStarted = true;
    console.log('Starting quiz for exam:', examId);
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

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
