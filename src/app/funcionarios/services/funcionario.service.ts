import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, mergeMap, Observable, tap } from 'rxjs';
import { Funcionario } from '../models/funcionario';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/funcionarios'
  atualizarFuncionariosSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) { }

  getFuncionarios(): Observable<Funcionario[]> {
    const token = this.authService.recuperarToken()
    return this.http.get<Funcionario[]>(this.baseUrl)
  }

  deleteFuncionario(func: Funcionario): Observable<any> {
    const token = this.authService.recuperarToken()

    if (func.foto && func.foto.length > 0) {
      return this.storage.refFromURL(func.foto).delete()
        .pipe(
          mergeMap(() => {
            return this.http.delete<any>(`${this.baseUrl}/${func.idFuncionario}`)
          })
        )
    }

    return this.http.delete<any>(`${this.baseUrl}/${func.idFuncionario}`,)
  }

  getFuncionarioById(id: number): Observable<Funcionario> {
    const token = this.authService.recuperarToken()

    return this.http.get<Funcionario>(`${this.baseUrl}/${id}`)
  }


  salvarFuncionario(func: Funcionario, idCargo: number, foto?: File): Observable<Funcionario> {
    if (foto == undefined) {
      return this.http.post<Funcionario>(`${this.baseUrl}/${idCargo}`, func)
    }

    return this.uploadImagem(foto).pipe(mergeMap((linkFotoFirebase) => {
      func.foto = linkFotoFirebase
      return this.http.post<Funcionario>(`${this.baseUrl}/${idCargo}`, func)
    }))
  }


  atualizarFuncionario(func: Funcionario, foto?: File): Observable<Funcionario> {

    if (foto == undefined) {
      return this.http.put<Funcionario>(`${this.baseUrl}/${func.idFuncionario}`, func)
        .pipe(
          tap((funcionario) => {
            this.atualizarFuncionariosSub$.next(true)
          })
        )
    }

    if (func.foto && func.foto.length > 0) {
      const inscricao = this.storage.refFromURL(func.foto).delete()
        .subscribe(
          () => {
            inscricao.unsubscribe()
          }
        )
    }
    return this.uploadImagem(foto).pipe(mergeMap((linkFotoFirebase) => {
      func.foto = linkFotoFirebase;
      return this.http.put<Funcionario>(`${this.baseUrl}/${func.idFuncionario}`, func)
    }),
      tap((funcionario) => {
        this.atualizarFuncionariosSub$.next(true)
      })
    )
  }

  private uploadImagem(foto: File): Observable<string> {

    const nomeDoArquivo = Date.now()
    const dados = from(this.storage.upload(`${nomeDoArquivo}`, foto))
    return dados.pipe(mergeMap(
      (result) => { return result.ref.getDownloadURL() }))
  }
}