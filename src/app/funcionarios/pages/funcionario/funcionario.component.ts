import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cargo } from 'src/app/cargos/models/cargo';
import { CargoService } from 'src/app/cargos/services/cargo.service';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  funcionario!: Funcionario
  cargos: Cargo[] = []

  formFuncionario: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    idCargo: ['', [Validators.required]],
    foto: ['']
  })

  imagePreview: string = ''
  foto!: File
  desabilitar: boolean = true
  salvandoFuncionario = false

  constructor(
    private funcService: FuncionarioService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private cargoService: CargoService,
    private dialogref: MatDialogRef<FuncionarioComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.recuperarFuncionario()
    this.mostrarCargos()
  }

  mostrarCargos() {
    this.cargoService.getCargos().subscribe(
      (carg) => {
        this.cargos = carg
      }
    )
  }

  recuperarFuncionario(): void {
    this.funcionario = this.data;
    this.formFuncionario.setValue({
      nome: this.funcionario.nome,
      email: this.funcionario.email,
      idCargo: this.funcionario.cargo.idCargo,
      foto: ''
    })
    this.imagePreview = this.funcionario.foto
    this.valorMudou()
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
          this.desabilitar = this.formFuncionario.invalid || !(valores.nome != this.funcionario.nome || valores.email != this.funcionario.email || valores.idCargo != this.funcionario.cargo.idCargo || valores.foto.length > 0)
        }
      )
  }

  salvarAtualizacoes() {
    this.salvandoFuncionario = true
    const f: Funcionario = { ...this.formFuncionario.value }
    f.idFuncionario = this.funcionario.idFuncionario
    f.foto = this.funcionario.foto
    const idCargo: number = this.formFuncionario.value.idCargo
    this.cargoService.getCargoById(idCargo).subscribe(
      (cargo) => {
        f.cargo = cargo
        const temFoto = this.formFuncionario.value.foto.length > 0

        const obsSalvar: Observable<any> = this.funcService.atualizarFuncionario(f, temFoto ? this.foto : undefined)

        obsSalvar
          .subscribe(
            (func) => {
              this.snackbar.open('Funcionário salvo com sucesso', 'Ok', {
                duration: 3000
              })
              this.dialogref.close()
            }
          )
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