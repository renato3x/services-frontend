import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificacaoTokenGuard } from '../guards/verificacao-token.guard';

import { ListarCargosComponent } from './pages/listar-cargos/listar-cargos.component';

const routes: Routes = [
  {
    path: '',
    component: ListarCargosComponent,
    canActivate: [
      VerificacaoTokenGuard
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargosRoutingModule { }