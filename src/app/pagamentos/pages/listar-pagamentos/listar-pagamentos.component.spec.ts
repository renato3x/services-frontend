import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPagamentosComponent } from './listar-pagamentos.component';

describe('ListarPagamentosComponent', () => {
  let component: ListarPagamentosComponent;
  let fixture: ComponentFixture<ListarPagamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPagamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPagamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
