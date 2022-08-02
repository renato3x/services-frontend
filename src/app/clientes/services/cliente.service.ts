import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, mergeMap, Observable, tap } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Endereco } from '../models/endereco';
import { EnderecosService } from './enderecos.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  atualizarClientes$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(
    private http: HttpClient,
    private enderecoService: EnderecosService
  ) { }
  
  private readonly baseUrl: string = 'http://localhost:8080/servicos/clientes'
  

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.baseUrl);
  }

  buscarClientePorId(idCliente: number){
    return this.http.get<Cliente>(`${this.baseUrl}/${idCliente}`)
  }

  cadastrarClientes(cliente: Cliente){
    return this.http.post<Cliente>(this.baseUrl, cliente).pipe(
      tap(() => this.atualizarClientes$.next(true))
    )
  }

  editarClientes(cliente: Cliente, idCliente: number, endereco?: Endereco): Observable<Cliente>{
    
    if(endereco != null){  

      return this.enderecoService.editarEndereco(idCliente, endereco).pipe(
        mergeMap(
          (endereco) => {
            cliente.enderecoCliente = endereco;
            return this.http.put<Cliente>(`${this.baseUrl}/${idCliente}`, cliente)
            .pipe(
              tap(() => this.atualizarClientes$.next(true)))
          }
        )
      )
    }

    return this.http.put<Cliente>(`${this.baseUrl}/${idCliente}`, cliente).pipe(
      tap(() => this.atualizarClientes$.next(true))
    )
  }

  deletarCliente(idCliente: number){
    return this.http.delete<Cliente>(`${this.baseUrl}/${idCliente}`).pipe(
      tap(
        () => this.atualizarClientes$.next(true)
       )
    )
  }
}
