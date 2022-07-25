import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargosRoutingModule } from './cargos-routing.module';
import { ListarCargosComponent } from './pages/listar-cargos/listar-cargos.component';
import { MaterialModule } from '../material/material.module';
import { FormCargosComponent } from './components/form-cargos/form-cargos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmarDelecaoComponent } from './components/confirmar-delecao/confirmar-delecao.component';
import { CargoComponent } from './pages/cargo/cargo.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ConfirmarSaidaComponent } from './components/confirmar-saida/confirmar-saida.component';

@NgModule({
  declarations: [
    ListarCargosComponent,
    FormCargosComponent,
    ConfirmarDelecaoComponent,
    CargoComponent,
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
