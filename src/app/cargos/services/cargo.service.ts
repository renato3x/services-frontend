import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Cargo } from '../models/cargo';


@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/cargos'

  atualizarCargosSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }
  
  getCargos(): Observable<Cargo[]> {

    return this.http.get<Cargo[]>(this.baseUrl)
  }
  
  getCargoById(id: number): Observable<Cargo> {
  
    return this.http.get<Cargo>(`${this.baseUrl}/${id}`)
  }

  deleteCargo(cargo: Cargo): Observable<any> {
    
    return this.http.delete<any>(`${this.baseUrl}/${cargo.idCargo}`)
    .pipe(
      tap((carg) => {
        this.atualizarCargosSub$.next(true)
      })
    )
  }

  salvarCargo(cargo: Cargo): Observable<Cargo> {

    return this.http.post<Cargo>(this.baseUrl, cargo)
  }

  atualizarCargo(cargo: Cargo): Observable<Cargo> {
    
    return this.http.put<Cargo>(`${this.baseUrl}/${cargo.idCargo}`, cargo)
    .pipe(
      tap((carg) => {
        this.atualizarCargosSub$.next(true)
      })
    )
  }
}




