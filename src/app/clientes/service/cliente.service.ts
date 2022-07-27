import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Cliente } from '../models/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/clientes'

  atualizarClientesSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getClientes(): Observable<Cliente[]> {

    return this.http.get<Cliente[]>(this.baseUrl)

  }

  getClienteById(id: number): Observable<Cliente> {

    return this.http.get<Cliente>(`${this.baseUrl}/${id}`)
  }

  deleteCliente(cliente: Cliente): Observable<any> {

    return this.http.delete<any>(`${this.baseUrl}/${cliente.idCliente}`)
    .pipe(
      tap((carg) => {
        this.atualizarClientesSub$.next(true)
      })
    )
  }

  salvarCliente(cliente: Cliente): Observable<Cliente> {

    return this.http.post<Cliente>(this.baseUrl, cliente)

  }

  atualizarCliente(cliente: Cliente): Observable<Cliente> {

    return this.http.put<Cliente>(`${this.baseUrl}/${cliente.idCliente}`, cliente)
    .pipe(
      tap((carg) => {
        this.atualizarClientesSub$.next(true)
      })
    )

  }

}
