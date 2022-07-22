import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, mergeMap, Observable, tap } from 'rxjs';
import { Funcionario } from '../models/funcionario';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // importação do fireStorage
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/funcionarios'
  atualizarFuncionariosSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage, // objeto responsável por salvar os arquivos no firebase
    private authService: AuthService
  ) { }

  getFuncionarios(): Observable<Funcionario[]> {
    const token = this.authService.recuperarToken()

    // Bearer token
    return this.http.get<Funcionario[]>(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  // http://localhost:3000/funcionarios/
  deleteFuncionario(func: Funcionario): Observable<any> {
    const token = this.authService.recuperarToken()

    // se não tiver foto, apenas será deletado o email e nome
    if (func.foto.length > 0) {
      //1° pegar a referência da imagem no fireStorage
      /**
       * refFromURL() pega referência do arquivo do storage pelo link de acesso gerado
       * pelo firebase
       */
      return this.storage.refFromURL(func.foto).delete()
        .pipe(
          mergeMap(() => {
            /**
             * mergeMap tem a função de pegar dois ou mais observables e transformar todos
             * em um só
             */
            return this.http.delete<any>(`${this.baseUrl}/${func.idFuncionario}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
          })
        )
    }

    return this.http.delete<any>(`${this.baseUrl}/${func.idFuncionario}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  getFuncionarioById(id: number): Observable<Funcionario> {
    const token = this.authService.recuperarToken()

    return this.http.get<Funcionario>(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  /**
   * RXJS Operators: funções que manipulam os dados que
   * os observables te retornam
   */
  /**
   * O ? na frente do parâmetro faz com que ele seja opcional na hora de executar a função
   */
  salvarFuncionario(func: Funcionario, foto?: File): Observable<Funcionario> {
    /**
     * fazendo requisição POST para salvar os dados do funcionário
     * return funcionário que acabou de ser salvo
     */

    /**
     * a função pipe é utilizada para colocar os operadores do RXJS
     * que manipularão os dados que são retornados dos observables
     */

    /**
     * o pipe map manipula cada dado que o observable te retorna,
     * transformando em algo diferente e te retorna esse dado modificado
     */
    if (foto == undefined) { // se a foto não existe, será retornado um observable que apenas salva os dados básicos
      return this.http.post<Funcionario>(this.baseUrl, func)
    }

    return this.uploadImagem(foto).pipe(mergeMap((linkFotoFirebase) => {
      func.foto = linkFotoFirebase
      return this.http.post<Funcionario>(this.baseUrl, func)
    }))
  }

  // fazer com que a função receba a foto ou não
  atualizarFuncionario(func: Funcionario, foto?: File): Observable<Funcionario> {

    // se a foto não foi passada, atualizar apenas com os dados básicos
    if (foto == undefined) {
      return this.http.put<Funcionario>(`${this.baseUrl}/${func.idFuncionario}`, func)
        .pipe(
          tap((funcionario) => {
            this.atualizarFuncionariosSub$.next(true)
          })
        )
    }


    // se já existir uma foto ligada a esse funcionário, iremos deletá-la para pôr a nova
    if (func.foto.length > 0) {
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

  // 1° Pegar a imagem
  // 2° Fazer o upload da imagem
  // 3° Gerar o link de download e retorná-lo
  private uploadImagem(foto: File): Observable<string> {
    // a palavra async informa que a função vai trabalhar com
    // código assíncrono, ou seja, códigos que demoram para serem executados

    const nomeDoArquivo = Date.now() // retorna a data atual em milissegundos

    // faz o upload do arquivo para o firebase
    // 1° Parâmetro: nome do arquivo
    // 2° Parâmetro: o arquivo que deve ser enviado
    const dados = from(this.storage.upload(`${nomeDoArquivo}`, foto))

    // a propriedade REF é a referência do arquivo no firebase

    return dados.pipe(mergeMap(
      (result) => { return result.ref.getDownloadURL() }))
  }
}
