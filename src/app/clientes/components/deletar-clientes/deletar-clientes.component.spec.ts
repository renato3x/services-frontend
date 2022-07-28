import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarClientesComponent } from './deletar-clientes.component';

describe('DeletarClientesComponent', () => {
  let component: DeletarClientesComponent;
  let fixture: ComponentFixture<DeletarClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletarClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
