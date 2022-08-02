import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarChamadosComponent } from './listar-chamados.component';

describe('ListarChamadosComponent', () => {
  let component: ListarChamadosComponent;
  let fixture: ComponentFixture<ListarChamadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarChamadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarChamadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
