import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagamentosRoutingModule } from './pagamentos-routing.module';

import { ConfirmarSaidaComponent } from './components/confirmar-saida/confirmar-saida.component';
import { FormPagamentosComponent } from './components/form-pagamentos/form-pagamentos.component';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';
import { ListarPagamentosComponent } from './pages/listar-pagamentos/listar-pagamentos.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared-components/shared-components.module';


@NgModule({
  declarations: [    
    ConfirmarSaidaComponent,
    FormPagamentosComponent,
    PagamentoComponent,
    ListarPagamentosComponent
  ],
  imports: [
    CommonModule,
    PagamentosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class PagamentosModule { }
