import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarDelecaoComponent } from './confirmar-delecao.component';

describe('ConfirmarDelecaoComponent', () => {
  let component: ConfirmarDelecaoComponent;
  let fixture: ComponentFixture<ConfirmarDelecaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarDelecaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarDelecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
