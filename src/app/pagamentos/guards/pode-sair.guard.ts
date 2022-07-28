import { DialogRef } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmarSaidaComponent } from '../components/confirmar-saida/confirmar-saida.component';
import { PagamentoComponent } from '../pages/pagamento/pagamento.component';

@Injectable({
  providedIn: 'root'
})
export class PodeSairGuard implements CanDeactivate<PagamentoComponent> {

  constructor(
    private dialog: MatDialog
  ){}

  canDeactivate(
    component: PagamentoComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (component.pagamento) {
        const valor = component.formPagamento.value.valor
        const formDePagamento = component.formPagamento.value.formPagamento
        const status = component.formPagamento.value.status

        if (valor != component.pagamento.valor || formDePagamento != component.pagamento.formPagamento || status != component.formPagamento.value.status) {
          
          const dialogRef = this.dialog.open(ConfirmarSaidaComponent)          
          const querSair = dialogRef.afterClosed()

          return querSair
        } else {
          return true
        }
      }
    return true;
  }
  
}
