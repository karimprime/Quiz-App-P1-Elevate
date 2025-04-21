import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecQuizzesComponent } from './sec-quizzes.component';

describe('SecQuizzesComponent', () => {
  let component: SecQuizzesComponent;
  let fixture: ComponentFixture<SecQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecQuizzesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
