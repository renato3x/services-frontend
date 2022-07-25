import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExcluirCargoComponent } from './dialog-excluir-cargo.component';

describe('DialogExcluirCargoComponent', () => {
  let component: DialogExcluirCargoComponent;
  let fixture: ComponentFixture<DialogExcluirCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExcluirCargoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogExcluirCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
