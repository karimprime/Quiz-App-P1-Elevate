import { Component, inject, signal } from '@angular/core';
import { SecUserDataComponent } from '../../layouts/additions/sec-user-data/sec-user-data.component';
import { SubjectsService } from '../../../shared/services/subjects/subjects.service';
import { defer } from 'rxjs';
import { SecSubjectsComponent } from '../../layouts/additions/sec-subjects/sec-subjects.component';

@Component({
  selector: 'app-home',
  imports: [SecUserDataComponent, SecSubjectsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly _subjectsService = inject(SubjectsService);

  numSubjects = signal(4);
  quizSubjects = signal<any[]>([]);
  isLoading = signal(false);
  hasLoadedAll = signal(false);
  totalSubjects = signal(0);
  ngOnInit() {
    this.loadInitialSubjects();
  }

  loadInitialSubjects() {
    this.isLoading.set(true);
    defer(() =>
      this._subjectsService.getAllPSubjects(this.numSubjects())
    ).subscribe({
      next: (res: any) => {
        const mappedSubjects = res.subjects.map((subject: any) => ({
          id: subject._id,
          title: subject.name,
          image: subject.icon,
          altText: `${subject.name} quiz`,
          subtitle: `Test your ${subject.name} knowledge`,
        }));
        this.quizSubjects.set(mappedSubjects);
        this.totalSubjects.set(res.total);
        if (mappedSubjects.length === res.total) {
          this.hasLoadedAll.set(true);
        }
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
    defer(() =>
      this._subjectsService.getAllPSubjects(this.totalSubjects())
    ).subscribe({
      next: (res: any) => {
        const mappedSubjects = res.subjects.map((subject: any) => ({
          id: subject._id,
          title: subject.name,
          image: subject.icon,
          altText: `${subject.name} quiz`,
          subtitle: `Test your ${subject.name} knowledge`,
        }));
        this.quizSubjects.set(mappedSubjects);
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
