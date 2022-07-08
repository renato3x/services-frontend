import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  funcionario!: Funcionario

  formFuncionario: FormGroup = this.fb.group({
    nome: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    foto: ['']
  })

  imagePreview: string = ''
  foto!: File // undefined
  desabilitar: boolean = true
  naoEncontrado: boolean = false

  constructor(
    private route: ActivatedRoute, // acessar os parâmetros da rota ativa
    private funcService: FuncionarioService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // let idFuncionario = this.route.snapshot.paramMap.get('idFuncionario')
    this.route.paramMap.subscribe(
      (params) => {
        let idFuncionario = parseInt(params.get('idFuncionario') ?? '0')
        this.recuperarFuncionario(idFuncionario)
      }
    )
  }

  recuperarFuncionario(id: number): void {
    this.funcService.getFuncionarioById(id)
    .subscribe(
      func => {
        //1° pegar o funcionário que foi retornado e colocar dentro da propriedade funcionario
        this.funcionario = func

        // 2° pegar os dados do funcionário e atribuir esses valores aos seus respectivos campos
        // no formulário

        /**
         * setValue() é responsável por pegar os valores que foram passados para ela
         * e colocar dentro dos formControls
         */
        this.formFuncionario.setValue({
          nome: this.funcionario.nome,
          email: this.funcionario.email,
          foto: ''
        })

        // 3° carregar o preview da imagem
        this.imagePreview = this.funcionario.foto

        this.valorMudou()
      },
      (erro: HttpErrorResponse) => {
        this.naoEncontrado = erro.status == 404
      }
    )
  }

  recuperarFoto(event: any): void {
    this.foto = event.target.files[0]

    const reader = new FileReader() // objeto do js que faz leitura de arquivos

    reader.readAsDataURL(this.foto) // ler o arquivo e gerar um link local para o acesso do conteúdo daquele arquivo

    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
  }

  valorMudou() {
    /**
     * valueChanges é uma propriedade dos FormGroups
     * que é um observable que quando um valor do seu formulário
     * altera, esse observable te retorna essa modificação
     */
    this.formFuncionario.valueChanges
    .subscribe(
      /**
       * o parâmetro valores é um objeto que é retornado te informando
       * o valor de cada campo do seu reative forms
       */
      (valores) => {
        /**
         * o botão será desabilitado se as validações do formulário estiverem inválidas
         * ou se o valor de algum campo do formulário estiver diferente do valor de alguma
         * propriedade do objeto funcionário
         */
        this.desabilitar = this.formFuncionario.invalid || !(valores.nome != this.funcionario.nome || valores.email != this.funcionario.email || valores.foto.length > 0)
      }
    )
  }

  salvarAtualizacoes() {
    const f: Funcionario = { ...this.formFuncionario.value }
    f.id = this.funcionario.id
    f.foto = this.funcionario.foto

    const temFoto = this.formFuncionario.value.foto.length > 0

    const obsSalvar: Observable<any> = this.funcService.atualizarFuncionario(f, temFoto ? this.foto : undefined)

    obsSalvar
    .subscribe(
      (resultado) => {
        if (resultado instanceof Observable<Funcionario>) {
          resultado
          .subscribe(
            (func) => {
              this.snackbar.open('Funcionário salvo com sucesso', 'Ok', {
                duration: 3000
              })

              this.recuperarFuncionario(func.id)
            }
          )
        }

        this.snackbar.open('Funcionário salvo com sucesso', 'Ok', {
          duration: 3000
        })

        this.recuperarFuncionario(resultado.id)
      }
    )
  }
}
