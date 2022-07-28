import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ConfirmarDelecaoComponent } from './components/confirmar-delecao/confirmar-delecao.component';
import { ConfirmarSaidaComponent } from './components/confirmar-saida/confirmar-saida.component';


@NgModule({
  declarations: [
    ListarClientesComponent,
    FormClientesComponent,
    ClienteComponent,
    ConfirmarDelecaoComponent,
    ConfirmarSaidaComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedComponentsModule
  ]
})
export class ClientesModule { }
