import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { DeletarClienteComponent } from '../componentes/deletar-cliente/deletar-cliente.component';
import { FormClienteComponent } from '../componentes/form-cliente/form-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompartilharComponentesModule } from 'src/app/compartilhar-componentes/compartilhar-componentes.module';
import { ClienteComponent } from '../pages/cliente/cliente.component';
import { EditarClienteComponent } from '../componentes/editar-cliente/editar-cliente.component';


@NgModule({
  declarations: [
    DeletarClienteComponent,
    FormClienteComponent,
    ClienteComponent,
    EditarClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CompartilharComponentesModule
  ]
})
export class ClienteModule { }
