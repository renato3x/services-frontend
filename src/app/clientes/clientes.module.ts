import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListarClientesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ClientesModule { }
