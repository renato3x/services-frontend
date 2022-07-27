import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
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
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    foto: ['']
  })

  imagePreview: string = ''
  foto!: File
  desabilitar: boolean = true
  naoEncontrado: boolean = false

  constructor(
    private route: ActivatedRoute,
    private funcService: FuncionarioService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private titleService: Title,
  ) { }

  ngOnInit(): void {

    this.titleService.setTitle("Lista de Funcionarios")
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
          this.funcionario = func
          this.formFuncionario.setValue({
            nome: this.funcionario.nome,
            email: this.funcionario.email,
            foto: ''
          })
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

    const reader = new FileReader()
    reader.readAsDataURL(this.foto)
    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
  }

  valorMudou() {
    this.formFuncionario.valueChanges
      .subscribe(
        (valores) => {
          this.desabilitar = this.formFuncionario.invalid || !(valores.nome != this.funcionario.nome || valores.email != this.funcionario.email || valores.foto.length > 0)
        }
      )
  }

  salvarAtualizacoes() {
    const f: Funcionario = { ...this.formFuncionario.value }
    f.idFuncionario = this.funcionario.idFuncionario
    f.foto = this.funcionario.foto

    const fotoFuncionario = this.formFuncionario.value.foto.length > 0

    const obsSalvar: Observable<any> = this.funcService.atualizarFuncionario(f, fotoFuncionario ? this.foto : undefined)

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

  deletar(): void {
    this.dialog.open(ConfirmarDelecaoComponent)
      .afterClosed()
      .subscribe(
        (deletar) => {
          if (deletar) {
            this.funcService.deleteFuncionario(this.funcionario)
              .subscribe(
                () => {
                  this.snackbar.open('Funcionário deletado', 'Ok', {
                    duration: 3000
                  })
                  this.router.navigateByUrl('/funcionarios')
                }
              )
          }
        }
      )
  }
}