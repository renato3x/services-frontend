import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCargoComponent } from './form-cargo.component';

describe('FormCargoComponent', () => {
  let component: FormCargoComponent;
  let fixture: ComponentFixture<FormCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCargoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});