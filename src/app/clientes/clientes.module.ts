import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastrarClienteComponent } from './components/cadastrar-cliente/cadastrar-cliente.component';
import { AtualizarClienteComponent } from './components/atualizar-cliente/atualizar-cliente.component';
import { CompartilharComponentesModule } from '../compartilhar-componentes/compartilhar-componentes.module';
import { DeletarClientesComponent } from './components/deletar-clientes/deletar-clientes.component';


@NgModule({
  declarations: [
    ListarClientesComponent,
    CadastrarClienteComponent,
    AtualizarClienteComponent,
    DeletarClientesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CompartilharComponentesModule
  ]
})
export class ClientesModule { }
