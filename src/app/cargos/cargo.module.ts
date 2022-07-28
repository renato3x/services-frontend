import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargoRoutingModule } from './cargo-routing.module';
import { NavbarComponent } from 'src/app/compartilhar-componentes/navbar/navbar.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteCargoComponent } from './components/delete-cargo/delete-cargo.component';
import { CompartilharComponentesModule } from '../compartilhar-componentes/compartilhar-componentes.module';
import { CargosComponent } from './pages/cargos/cargos.component';
import { CadastrarCargoComponent } from './components/cadastrar-cargo/cadastrar-cargo.component';
import { EditarCargoComponent } from './pages/editar-cargo/editar-cargo.component';


@NgModule({
  declarations: [
    DeleteCargoComponent,
    CargosComponent,
    CadastrarCargoComponent,
    EditarCargoComponent
  ],
  imports: [
    CommonModule,
    CargoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CompartilharComponentesModule
  ]
})
export class CargoModule { }
