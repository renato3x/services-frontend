import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ConfirmarLogoutComponent } from './confirmar-logout/confirmar-logout.component';




@NgModule({
  declarations: [
    NavbarComponent,
    ConfirmarLogoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
    
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedComponentsModule { }
