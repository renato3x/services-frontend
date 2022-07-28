import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificacaoTokenGuard } from '../guards/verificacao-token.guard';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';


const routes: Routes = [
  {
    path: '',
    component: ListarClientesComponent,
    canActivate: [
    VerificacaoTokenGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
