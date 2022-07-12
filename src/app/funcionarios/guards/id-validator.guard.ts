import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdValidatorGuard implements CanActivate {

  constructor(
    private router: Router // é o objeto responsável por fazer o roteamento das páginas pelo TS
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot, // você tem acesso aos parâmetros da rota
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /**
     * Se idFuncionario for um número -> Permita entrar na página
     * Se idFuncionario não for um número -> Não permita entrar na página
     */
    // isNaN() vai te informar se o valor que você passou como parâmetro não é um número

    const idFuncionario = Number(route.paramMap.get('idFuncionario') as string)

    if (isNaN(idFuncionario)) {
      return this.router.parseUrl('/funcionarios')
    }

    return true
  }
}
