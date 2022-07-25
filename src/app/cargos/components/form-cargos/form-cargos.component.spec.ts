import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCargosComponent } from './form-cargos.component';

describe('FormCargosComponent', () => {
  let component: FormCargosComponent;
  let fixture: ComponentFixture<FormCargosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCargosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
