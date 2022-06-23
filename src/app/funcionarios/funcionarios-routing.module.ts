import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFuncionariosComponent } from './pages/listar-funcionarios/listar-funcionarios.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListarFuncionariosComponent
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
export class FuncionariosRoutingModule { }
