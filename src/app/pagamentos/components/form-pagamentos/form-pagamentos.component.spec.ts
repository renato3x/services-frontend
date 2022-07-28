import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPagamentosComponent } from './form-pagamentos.component';

describe('FormPagamentosComponent', () => {
  let component: FormPagamentosComponent;
  let fixture: ComponentFixture<FormPagamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPagamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPagamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
