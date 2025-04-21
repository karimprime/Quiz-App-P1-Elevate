// home.component.ts
import { Component, inject, signal } from '@angular/core';
import { SecUserDataComponent } from '../../layouts/additions/sec-user-data/sec-user-data.component';
import { SecQuizzesComponent } from '../../layouts/additions/sec-quizzes/sec-quizzes.component';
import { SubjectsService } from '../../../core/services/subjects/subjects.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { defer } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SecUserDataComponent, SecQuizzesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent {
  private readonly _subjectsService = inject(SubjectsService);

  numSubjects = signal(4);
  quizSubjects = signal<any[]>([]);
  isLoading = signal(false);
  hasLoadedAll = signal(false);

  ngOnInit() {
    this.loadInitialSubjects();
  }

  loadInitialSubjects() {
    this.isLoading.set(true);
    defer(() =>
      this._subjectsService.getAllPSubjects(this.numSubjects())
    ).subscribe({
      next: (res: any) => {
        this.quizSubjects.set(
          res.subjects.map((subject: any) => ({
            id: subject._id,
            title: subject.name,
            image: subject.icon,
            altText: `${subject.name} quiz`,
            subtitle: `Test your ${subject.name} knowledge`,
          }))
        );
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Error fetching subjects:', err);
        this.isLoading.set(false);
      },
    });
  }

  loadAllSubjects() {
    if (this.hasLoadedAll()) return;

    this.isLoading.set(true);
    this.numSubjects.set(10);

    defer(() =>
      this._subjectsService.getAllPSubjects(this.numSubjects())
    ).subscribe({
      next: (res: any) => {
        this.quizSubjects.set(
          res.subjects.map((subject: any) => ({
            id: subject._id,
            title: subject.name,
            image: subject.icon,
            altText: `${subject.name} quiz`,
            subtitle: `Test your ${subject.name} knowledge`,
          }))
        );
        this.isLoading.set(false);
        this.hasLoadedAll.set(true);
      },
      error: (err: any) => {
        console.error('Error fetching subjects:', err);
        this.isLoading.set(false);
      },
    });
  }
}
