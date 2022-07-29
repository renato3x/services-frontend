import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// localhost:4200 -> localhost:4200/funcionarios

const routes: Routes = [
  {
    path: 'funcionarios',
    loadChildren: () => import('./funcionarios/funcionarios.module').then(m => m.FuncionariosModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'funcionarios'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'cargos',
    loadChildren: () => import('./cargos/cargo.module').then(m => m.CargoModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/cliente/cliente.module').then(m => m.ClienteModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
