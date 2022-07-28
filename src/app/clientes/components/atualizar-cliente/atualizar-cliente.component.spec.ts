import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarClienteComponent } from './atualizar-cliente.component';

describe('AtualizarClienteComponent', () => {
  let component: AtualizarClienteComponent;
  let fixture: ComponentFixture<AtualizarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
