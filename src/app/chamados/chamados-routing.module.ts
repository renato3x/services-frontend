import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificacaoTokenGuard } from '../guards/verificacao-token.guard';
import { ListarChamadosComponent } from './pages/listar-chamados/listar-chamados.component';

const routes: Routes = [
  {
    path: '',
    component: ListarChamadosComponent,
    canActivate: [
      VerificacaoTokenGuard
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class ChamadosRoutingModule { }