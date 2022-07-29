import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/enderecoCliente'
  atualizarEnderecoSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(
    private http: HttpClient
  ) { }

  salvarEndereco(endereco: Endereco, idCliente: number): Observable<Endereco> {
    return this.http.post<Endereco>(`${this.baseUrl}/${idCliente}`, endereco)
  }

  atualizarEndereco(endereco: Endereco): Observable<Endereco> {
    return this.http.put<Endereco>(`${this.baseUrl}/${endereco.idEndereco}`, endereco)
  }

}
