import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-form-funcionario',
  templateUrl: './form-funcionario.component.html',
  styleUrls: ['./form-funcionario.component.css']
})
export class FormFuncionarioComponent implements OnInit {

  formFuncionario: FormGroup = this.fb.group({
    nome: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    foto: ['']
  })

  foto!: File
  fotoPreview: string = ''
  salvandoFuncionario: boolean = false

  constructor(
    private fb: FormBuilder,
    private funcService: FuncionarioService,
    private dialogRef: MatDialogRef<FormFuncionarioComponent>, // objeto que permite controlar o dialog aberto
    private snackbar: MatSnackBar // com esse objeto será criado um snackbar na tela
  ) { }

  ngOnInit(): void {
  }

  recuperarFoto(event: any): void {
    this.foto = event.target.files[0]
    this.carregarPreview()
  }

  carregarPreview(): void {
    const reader = new FileReader()

    reader.readAsDataURL(this.foto)

    reader.onload = () => {
      this.fotoPreview = reader.result as string
    }
  }

  salvar(): void {
    this.salvandoFuncionario = true
    const f: Funcionario = this.formFuncionario.value
    let obsSalvar: Observable<any>

    if (this.formFuncionario.value.foto.length > 0) {
      obsSalvar = this.funcService.salvarFuncionario(f, this.foto)
    } else {
      obsSalvar = this.funcService.salvarFuncionario(f)
    }

    obsSalvar.subscribe(
      (resultado) => {
        // 1° testar se o resultado é uma Promise ou não
        if (resultado instanceof Promise) {
          /**
           * Se cair no if, significa que há uma promise e que tem uma
           * foto para salvar
           */

          // 1° -> Recuperar o observable que me é retornado do primeiro subscribe

          /**
           * a função then() é executada
           * quando a promise consegue te retornar os dados com sucesso
           *
           * nesse caso, o dado que será retorna é um observable com o funcionário
           * que foi salvo no banco de dados
           */
          resultado.then((obs$) => {
            // inscrevendo-se no observable que nos retornará o funcionário salvo no banco de dados
            obs$.subscribe(
              () => {
                // quando o funcionário for salvo, aparecerá um snackbar na tela e o dialog será fechado
                this.snackbar.open('Funcionário salvo com sucesso', 'Ok', {
                  duration: 3000
                })
                this.dialogRef.close()
              }
            )
          })
        } else {
          /**
           * Se cair no else, significa que o funcionário já foi salvo
           * e não tinha foto para enviar
           */
          this.snackbar.open('Funcionário salvo com sucesso', 'Ok', {
            duration: 3000
          })
          this.dialogRef.close()
        }
      }
    )
  }
}
