import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecosService {

  atualizarEndereco$: BehaviorSubject<boolean> = new BehaviorSubject(true)
  constructor(
    private http: HttpClient,
  ) { }
  
  private readonly baseUrl: string = 'http://localhost:8080/servicos/enderecoCliente'
  

  getEnderecos(): Observable<Endereco[]>{
    return this.http.get<Endereco[]>(this.baseUrl);
  }

  cadastrarEndereco(endereco: Endereco, idCliente: number){
    return this.http.post<Endereco>(`${this.baseUrl}/${idCliente}`, endereco).pipe(
      tap( () => this.atualizarEndereco$.next(true))
    )
  }

  editarEndereco(idEndereco: number, endereco: Endereco){
    return this.http.put<Endereco>(`${this.baseUrl}/${idEndereco}`, endereco).pipe(
      tap( () => this.atualizarEndereco$.next(true))
    )
  }
}
