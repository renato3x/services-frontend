import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmarSaidaComponent } from '../components/confirmar-saida/confirmar-saida.component';
import { Endereco } from '../models/endereco';
import { ClienteComponent } from '../pages/cliente/cliente.component';

@Injectable({
  providedIn: 'root'
})
export class PodeSairGuard implements CanDeactivate<ClienteComponent> {

  constructor(
    private dialog: MatDialog
  ) { }

  canDeactivate(
    component: ClienteComponent,

    
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (component.cliente) {


      const nome = component.formCliente.value.nome
      const email = component.formCliente.value.email
      const rua = component.formEndereco.value.rua
      const bairro = component.formEndereco.value.bairro
      const cidade = component.formEndereco.value.cidade
      const uf = component.formEndereco.value.uf

      if (nome != component.cliente.nome || email != component.cliente.email || 
        rua != (component.cliente.enderecoCliente?.rua || '') ||
        bairro != (component.cliente.enderecoCliente?.bairro || '') || 
        cidade != (component.cliente.enderecoCliente?.cidade || '') ||
        uf != (component.cliente.enderecoCliente?.uf || '') 
       ) 
       {
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