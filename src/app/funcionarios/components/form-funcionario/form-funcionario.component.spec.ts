import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFuncionarioComponent } from './form-funcionario.component';

describe('FormFuncionarioComponent', () => {
  let component: FormFuncionarioComponent;
  let fixture: ComponentFixture<FormFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFuncionarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
