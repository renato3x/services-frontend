import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmarSaidaComponent } from '../components/confirmar-saida/confirmar-saida.component';
import { CargoComponent } from '../pages/cargo/cargo.component';

@Injectable({
  providedIn: 'root'
})
export class PodeSairGuard implements CanDeactivate<CargoComponent> {

  constructor(
    private dialog: MatDialog
  ) {}

  canDeactivate(
    component: CargoComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (component.cargo) {
      const nome = component.formCargo.value.nome
      const descricao = component.formCargo.value.descricao
      const salario = component.formCargo.value.salario


      if (nome != component.cargo.nome || descricao != component.cargo.descricao || salario != component.cargo.salario) {
        const dialogRef = this.dialog.open(ConfirmarSaidaComponent)
        
      const querSair = dialogRef.afterClosed()
      
      return querSair
    } else {
      return true;
    }
  } 
  return true
  }
  
}
