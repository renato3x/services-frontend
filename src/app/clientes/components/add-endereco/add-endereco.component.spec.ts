import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnderecoComponent } from './add-endereco.component';

describe('AddEnderecoComponent', () => {
  let component: AddEnderecoComponent;
  let fixture: ComponentFixture<AddEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEnderecoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
