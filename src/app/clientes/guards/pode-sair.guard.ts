import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmarSaidaComponent } from '../components/confirmar-saida/confirmar-saida.component';
import { MatDialog } from '@angular/material/dialog';
import { ClienteComponent} from '../pages/cliente/cliente.component';


@Injectable({
  providedIn: 'root'
})
export class PodeSairGuard implements CanDeactivate<ClienteComponent> {

  constructor(
    private dialog: MatDialog
  ) {}

  canDeactivate(
    component: ClienteComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (component.cliente) {
      const nome = component.formCliente.value.nome
      const email = component.formCliente.value.email



      if (nome != component.cliente.nome || email != component.cliente.email) {
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
