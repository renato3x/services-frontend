import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargosComponent } from '../cargos.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:CargosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargosRouterRoutingModule { }