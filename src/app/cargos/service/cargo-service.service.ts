import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cargo } from 'src/app/funcionarios/models/cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoServiceService {

  private readonly baseUrl = 'http://localhost:8080/servicos/cargos'
  public atualizar$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(
    private http: HttpClient
  ) { }

  pegarCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.baseUrl)
  }

  pegarCargoPeloId(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.baseUrl}/${id}`)
  }

  deletarCargo(id: number | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.atualizar$.next(true)
      })
    )
  }

  cadastrarCargo(cargo: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(this.baseUrl, cargo)
  }

  atualizarCargo(cargo: Cargo) {
    return this.http.put<Cargo>(`${this.baseUrl}/${cargo.idCargo}`, cargo).pipe(
      tap((cargo: any) => {
        this.atualizar$.next(true)
      })
    )
  }
}
