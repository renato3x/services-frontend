import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargosRouterRoutingModule } from './cargos-router-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CompartilharComponentesModule } from 'src/app/compartilhar-componentes/compartilhar-componentes.module';
import { CargosComponent } from '../cargos.component';
import { MaterialModule } from 'src/app/material/material.module';




@NgModule({
  declarations: [
    CargosComponent
  ],
  imports: [
    CommonModule,
    CargosRouterRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CompartilharComponentesModule,
    MaterialModule
  ]
})
export class CargosRouterModule { }
