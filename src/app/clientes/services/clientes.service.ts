import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
urlBase:string = 'http://localhost:8080/servicos/clientes'
  constructor(private http:HttpClient) { }

  getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlBase)
  }
  getClienteById(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlBase}/${id}`)
  }
  deleteCliente(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlBase}/${id}`)
  }
  atualizarCliente(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlBase}/${cliente.idCliente}`,cliente)
  }
  cadastrarCliente(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(`${this.urlBase}`,cliente)
  }
}


