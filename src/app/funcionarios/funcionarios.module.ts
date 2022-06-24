import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { ListarFuncionariosComponent } from './pages/listar-funcionarios/listar-funcionarios.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    ListarFuncionariosComponent
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    MaterialModule,
  ]
})
export class FuncionariosModule { }
