import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable } from 'rxjs';
import { FuncionarioService } from 'src/app/funcionarios/services/funcionario.service';
import { Chamado } from '../models/chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {

  constructor(private http: HttpClient, private funcionarioService: FuncionarioService) { }

  baseUrl: string = 'http://localhost:8080/servicos/chamados'
  getChamados(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${this.baseUrl}`)
  }
  
  getChamadoById(idChamado: number): Observable<Chamado> {
    return this.http.get<Chamado>(`${this.baseUrl}/${idChamado}`)
  }

  putChamado(chamado: Chamado, idFuncionario?: number): Observable<Chamado> {
    if (idFuncionario) {
      return this.funcionarioService.getFuncionarioById(idFuncionario).pipe(mergeMap((response) => {
        chamado.funcionario = response;
        return this.http.put<Chamado>(`${this.baseUrl}/${chamado.idChamado}`, chamado)
      }))
    }
    return this.http.put<Chamado>(`${this.baseUrl}/${chamado.idChamado}`, chamado)
  }

  deleteChamado(idChamado: number): Observable<Chamado> {
    return this.http.delete<Chamado>(`${this.baseUrl}/${idChamado}`)
  }

  postChamado(chamado: Chamado, idCliente: number) {
    return this.http.post<Chamado>(`${this.baseUrl}/${idCliente}`, chamado)
  }
}