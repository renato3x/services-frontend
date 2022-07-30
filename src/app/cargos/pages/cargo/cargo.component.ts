import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cargo } from '../../models/cargo';
import { CargoService } from '../../services/cargo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmarSaidaComponent } from '../../components/confirmar-saida/confirmar-saida.component';


@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {
  salvandoCargo = false
  cargo!: Cargo

  formCargo: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    descricao: [''],
    salario: ['', [Validators.required, Validators.min(0)]]
  })

  desabilitar: boolean = true
  naoEncontrado: boolean = false

  constructor(
    private cargoService: CargoService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private dialogref: MatDialogRef<CargoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.recuperarCargo()
  }

  recuperarCargo(): void {
    this.cargo = this.data
    this.formCargo.setValue({
      nome: this.cargo.nome,
      descricao: this.cargo.descricao,
      salario: this.cargo.salario
    })
    this.valorMudou()
  }

  valorMudou() {
    this.formCargo.valueChanges
      .subscribe(
        (valores) => {
          this.desabilitar = this.formCargo.invalid || !(valores.nome != this.cargo.nome || valores.descricao != this.cargo.descricao || valores.salario != this.cargo.salario)
        })
  }

  atualizar(): void {
    Object.assign(this.cargo, this.formCargo.value)
    this.cargoService.atualizarCargo(this.cargo)
      .subscribe(
        (carg) => {
          this.snackbar.open('Cargo salvo com sucesso', 'Ok', {
            duration: 3000
          })
          this.dialogref.close();
        }
      )
  }
  sair() {
    if (!this.desabilitar) {
      const dialog = this.dialog.open(ConfirmarSaidaComponent)
      dialog.afterClosed().subscribe((response) => {
        if (response == false) {
          return
        } else {
          this.dialogref.close()
        }
      })
    } else {
      this.dialogref.close()
    }
  }
}