import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmarSaidaComponent } from '../components/confirmar-saida/confirmar-saida.component';
import { MatDialog } from '@angular/material/dialog';
import { ChamadoComponent } from '../pages/chamado/chamado.component';


@Injectable({
  providedIn: 'root'
})
export class PodeSairGuard implements CanDeactivate<ChamadoComponent> {

  constructor(
    private dialog: MatDialog
  ) { }

  canDeactivate(
    component: ChamadoComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (component.chamado) {
      const dataEntrada = component.formChamados.value.dataEntrada
      const titulo = component.formChamados.value.titulo
      const descricao = component.formChamados.value.descricao
      const status = component.formChamados.value.status

      if (dataEntrada != component.chamado.dataEntrada || titulo != component.chamado.titulo || descricao != component.chamado.descricao ||
        status != component.chamado.status) {
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
