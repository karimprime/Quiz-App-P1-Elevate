import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecUserDataComponent } from './sec-user-data.component';

describe('SecUserDataComponent', () => {
  let component: SecUserDataComponent;
  let fixture: ComponentFixture<SecUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecUserDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
