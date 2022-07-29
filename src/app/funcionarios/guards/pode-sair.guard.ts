import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmarSaidaComponent } from '../components/confirmar-saida/confirmar-saida.component';
import { FuncionarioComponent } from '../pages/funcionario/funcionario.component';

@Injectable({
  providedIn: 'root'
})
export class PodeSairGuard implements CanDeactivate<FuncionarioComponent> {

  constructor(
    private dialog: MatDialog
  ) {}

  canDeactivate(
    component: FuncionarioComponent, 
    currentRoute: ActivatedRouteSnapshot, 
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (component.funcionario) {      
      const nome = component.formFuncionario.value.nome
      const email = component.formFuncionario.value.email
      const foto = component.formFuncionario.value.foto

      if (nome != component.funcionario.nome || email != component.funcionario.email || foto.length > 0) {
      const dialogRef = this.dialog.open(ConfirmarSaidaComponent)

      const querSair = dialogRef.afterClosed()
      
      return querSair
    } else {
      return true
    }
    }
    return true
}
}
