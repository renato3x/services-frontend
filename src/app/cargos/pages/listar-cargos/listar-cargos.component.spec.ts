import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCargosComponent } from './listar-cargos.component';

describe('ListarCargosComponent', () => {
  let component: ListarCargosComponent;
  let fixture: ComponentFixture<ListarCargosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCargosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
