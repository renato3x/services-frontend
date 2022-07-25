import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarCargoComponent } from './dialog-editar-cargo.component';

describe('DialogEditarCargoComponent', () => {
  let component: DialogEditarCargoComponent;
  let fixture: ComponentFixture<DialogEditarCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditarCargoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditarCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
