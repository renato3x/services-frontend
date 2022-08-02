import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificacaoTokenGuard } from '../guards/verificacao-token.guard';
import { ListarPagamentosComponent } from './components/pagamentos/listar-pagamentos/listar-pagamentos.component';

const routes: Routes = [
  {
    path: '',
    component: ListarPagamentosComponent,
    canActivate: [
      VerificacaoTokenGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentosRoutingModule { }