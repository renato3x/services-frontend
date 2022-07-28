import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Cargo } from 'src/app/cargos/models/cargo';
import { CargoService } from 'src/app/cargos/services/cargo.service';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { ConfirmarSaidaFormComponent } from '../confirmar-saida-form/confirmar-saida-form.component';

@Component({
  selector: 'app-form-funcionario',
  templateUrl: './form-funcionario.component.html',
  styleUrls: ['./form-funcionario.component.css']
})
export class FormFuncionarioComponent implements OnInit {

  formFuncionario: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    foto: [''],
    idCargo: ['', [Validators.required]]
  })

  foto!: File
  fotoPreview: string = ''
  salvandoFuncionario: boolean = false

  cargos: Cargo[] = []

  constructor(
    private fb: FormBuilder,
    private funcService: FuncionarioService,
    private dialogRef: MatDialogRef<FormFuncionarioComponent>, // objeto que permite controlar o dialog aberto
    private dialog: MatDialog,
    private snackbar: MatSnackBar, // com esse objeto será criado um snackbar na tela
    private cargo: CargoService
  ) { }

  ngOnInit(): void {
    this.mostrarCargos()
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
    const idCargo: number = this.formFuncionario.value.idCargo
    let obsSalvar: Observable<any>

    if (this.formFuncionario.value.foto.length > 0) {
      obsSalvar = this.funcService.salvarFuncionario(f, idCargo, this.foto)
    } else {
      obsSalvar = this.funcService.salvarFuncionario(f, idCargo)
    }

    obsSalvar.subscribe(
      () => {
        this.snackbar.open('Funcionário salvo com sucesso', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close()
        console.log(f)
      }
    )
  }

  mostrarCargos() {
    this.cargo.getCargos().subscribe(
      (carg) => {
        this.cargos = carg
      }
    )
  }

  sair() {
    
    if (this.formFuncionario.value.nome.length > 0 || this.formFuncionario.value.email.length > 0 || this.formFuncionario.value.cargo != null || this.formFuncionario.value.foto.length > 0) {          
      this.dialog.open(ConfirmarSaidaFormComponent)
      .afterClosed().subscribe(
        (response) => {
          if (response) {
            this.dialogRef.close()
          }
        }
      )
    } else {
      this.dialogRef.close()
    }    
  }

}
