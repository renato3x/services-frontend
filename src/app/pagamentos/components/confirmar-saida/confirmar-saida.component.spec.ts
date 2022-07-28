import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarSaidaComponent } from './confirmar-saida.component';

describe('ConfirmarSaidaComponent', () => {
  let component: ConfirmarSaidaComponent;
  let fixture: ComponentFixture<ConfirmarSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarSaidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
