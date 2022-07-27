import { FormClientesComponent } from './components/form-cliente/form-cliente.component';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ConfirmarDelecaoComponent } from './components/confirmar-delecao/confirmar-delecao.component';
import { ConfirmarSaidaComponent } from './components/confirmar-saida/confirmar-saida.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConfirmarDelecaoComponent,
    ConfirmarSaidaComponent,
    ClienteComponent,
    ListarClientesComponent,
    FormClientesComponent
  ],


  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class ClientesModule { }
