import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargosRoutingModule } from './cargos-routing.module';
import { ListarCargosComponent } from './pages/listar-cargos/listar-cargos.component';
import { MaterialModule } from '../material/material.module';
import { FormCargoComponent } from './components/form-cargo/form-cargo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmarDelecaoComponent } from './components/confirmar-delecao/confirmar-delecao.component';
import { CargosComponent } from './pages/cargos/cargos.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ConfirmarSaidaComponent } from './components/confirmar-saida/confirmar-saida.component';

@NgModule({
  declarations: [
    ListarCargosComponent,
    FormCargoComponent,
    ConfirmarDelecaoComponent,
    CargosComponent,
    ConfirmarSaidaComponent
  ],
  imports: [
    CommonModule,
    CargosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class CargosModule { }