import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo } from 'src/app/funcionarios/models/cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoServiceService {

  private readonly baseUrl = 'http://localhost:8080/servicos/cargos'

  constructor(
    private http: HttpClient
  ) { }

  pegarCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.baseUrl)
  }

  pegarCargoPeloId(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.baseUrl}/${id}`)
  }
}
