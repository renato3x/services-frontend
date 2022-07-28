import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// localhost:4200 -> localhost:4200/funcionarios

const routes: Routes = [
  {
    path: 'funcionarios',
    loadChildren: () => import('./funcionarios/funcionarios.module').then(m => m.FuncionariosModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule)
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
    path:'cargos',
    loadChildren: () => import('./cargos/cargos-router/cargos-router.module').then(m => m.CargosRouterModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
