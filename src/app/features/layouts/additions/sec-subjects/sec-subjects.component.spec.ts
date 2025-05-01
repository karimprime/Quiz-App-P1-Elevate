import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecSubjectsComponent } from './sec-subjects.component';

describe('SecSubjectsComponent', () => {
  let component: SecSubjectsComponent;
  let fixture: ComponentFixture<SecSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecSubjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
