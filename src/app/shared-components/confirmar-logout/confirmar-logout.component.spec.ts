import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarLogoutComponent } from './confirmar-logout.component';

describe('ConfirmarLogoutComponent', () => {
  let component: ConfirmarLogoutComponent;
  let fixture: ComponentFixture<ConfirmarLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarLogoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
