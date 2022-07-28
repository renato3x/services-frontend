import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarChamadoComponent } from './alterar-chamado.component';

describe('AlterarChamadoComponent', () => {
  let component: AlterarChamadoComponent;
  let fixture: ComponentFixture<AlterarChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterarChamadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterarChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
