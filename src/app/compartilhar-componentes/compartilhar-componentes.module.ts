import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';



@NgModule({
  declarations: [
    NavbarComponent,
    LogoutDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class CompartilharComponentesModule { }
