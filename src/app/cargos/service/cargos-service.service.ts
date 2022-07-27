import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Cargos } from '../interface/cargos';

@Injectable({
  providedIn: 'root'
})
export class CargosServiceService {

  private readonly url:string = "http://localhost:8080/servicos/cargos"
  public update$:BehaviorSubject<boolean> = new BehaviorSubject(true)
  
  constructor(private http:HttpClient) { }

  getAllOffices():Observable<Cargos[]>{
   return this.http.get<Cargos[]>(this.url)
  }

  getOfficeById(id:number):Observable<Cargos> {
    return this.http.get<Cargos>(`${this.url}/${id}`)
  }

  deleteOfficeById(id:number):Observable<Cargos>{
    return this.http.delete<Cargos>(`${this.url}/${id}`).pipe(tap(() => {
      this.update$.next(true)
    }))
  }

  registerOffice(office:Cargos):Observable<Cargos> {
    return this.http.post<Cargos>(`${this.url}`, office).pipe(tap(() => {
      this.update$.next(true)
    }))
  }

  updateOffice(office:Cargos):Observable<Cargos> {
    return this.http.put<Cargos>(`${this.url}/${office.idCargo}`, office)
    .pipe(tap(() => {
      this.update$.next(true)
    }))
  }
}
