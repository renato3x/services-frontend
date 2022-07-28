import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ListarChamadosComponent } from './pages/listar-chamados/listar-chamados.component';
import { MaterialModule } from '../material/material.module';
import { ChamadosRoutingModule } from './chamados-routing.module';
import { LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { ConfirmarDelecaoComponent } from './components/confirmar-delecao/confirmar-delecao.component';
import { AlterarChamadoComponent } from './components/alterar-chamado/alterar-chamado.component';
import { FormChamadoComponent } from './components/form-chamado/form-chamado.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListarChamadosComponent,
    ConfirmarDelecaoComponent,
    AlterarChamadoComponent,
    FormChamadoComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    MaterialModule,
    ChamadosRoutingModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'BRL'
  },]
})
export class ChamadosModule { }
