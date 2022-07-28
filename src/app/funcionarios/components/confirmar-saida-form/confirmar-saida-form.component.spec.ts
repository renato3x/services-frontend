import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarSaidaFormComponent } from './confirmar-saida-form.component';

describe('ConfirmarSaidaFormComponent', () => {
  let component: ConfirmarSaidaFormComponent;
  let fixture: ComponentFixture<ConfirmarSaidaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarSaidaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarSaidaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
