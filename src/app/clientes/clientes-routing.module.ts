import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificacaoTokenGuard } from '../guards/verificacao-token.guard';
import { IdValidatorGuard } from './guards/id-validator.guard';
import { PodeSairGuard } from './guards/pode-sair.guard';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';



const routes: Routes = [
  {
    path: '',
    component: ListarClientesComponent,
    children: [
      {
        path: ':idCliente',
        component: ClienteComponent,
        canDeactivate: [
          PodeSairGuard
        ],
        canActivate: [
          IdValidatorGuard,
          VerificacaoTokenGuard
        ]
      }
    ],
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
