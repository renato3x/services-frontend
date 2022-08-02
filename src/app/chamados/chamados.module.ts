import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ListarChamadosComponent } from './pages/listar-chamados/listar-chamados.component';
import { MaterialModule } from '../material/material.module';
import { ChamadosRoutingModule } from './chamados-routing.module';
import { DEFAULT_CURRENCY_CODE } from '@angular/core';
import { ConfirmarDelecaoComponent } from './components/confirmar-delecao/confirmar-delecao.component';
import { ConfirmarSaidaComponent } from './components/confirmar-saida/confirmar-saida.component';

import { ChamadoComponent } from './pages/chamado/chamado.component';
import { FormChamadoComponent } from './components/form-chamado/form-chamado.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ListarChamadosComponent,
    ConfirmarDelecaoComponent,
    FormChamadoComponent,
    ChamadoComponent,
    ConfirmarSaidaComponent
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
  },
  { provide: MAT_DIALOG_DATA, useValue: {} },
  { provide: MatDialogRef, useValue: {} }]
})

export class ChamadosModule { }