import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPagamentoComponent } from './edit-pagamento.component';

describe('EditPagamentoComponent', () => {
  let component: EditPagamentoComponent;
  let fixture: ComponentFixture<EditPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPagamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
