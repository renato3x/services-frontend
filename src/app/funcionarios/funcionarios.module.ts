import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { ListarFuncionariosComponent } from './pages/listar-funcionarios/listar-funcionarios.component';


@NgModule({
  declarations: [
    ListarFuncionariosComponent
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule
  ]
})
export class FuncionariosModule { }
