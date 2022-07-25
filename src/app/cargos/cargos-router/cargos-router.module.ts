import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargosRouterRoutingModule } from './cargos-router-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CargosRouterRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CargosRouterModule { }
