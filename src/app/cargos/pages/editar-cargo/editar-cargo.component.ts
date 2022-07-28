import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs'; import { Cargo } from 'src/app/funcionarios/models/cargo';
import { CargoServiceService } from '../../service/cargo-service.service';
import { CargosComponent } from '../cargos/cargos.component';

@Component({
  selector: 'app-editar-cargo',
  templateUrl: './editar-cargo.component.html',
  styleUrls: ['./editar-cargo.component.css']
})
export class EditarCargoComponent implements OnInit {

  cargo!: Cargo

  formCargo: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    salario: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private cargoService: CargoServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CargosComponent>
  ) { }

  ngOnInit(): void {
    this.cargo = this.data
    this.recuperarCargo()
  }

  salvarAtualizacoes() {
    Object.assign(this.cargo, this.formCargo.value)

    const obsSalvar: Observable<any> = this.cargoService.atualizarCargo(this.cargo)

    obsSalvar
      .subscribe(
        (carg) => {
          this.snackbar.open('Cargo salvo com sucesso', 'Ok', {
            duration: 3000
          })

          this.dialogRef.close()
        }
      )
    this.snackbar.open('Cargo salvo com sucesso', 'Ok', {
      duration: 3000
    })
  }

  recuperarCargo(): void {
    this.formCargo.setValue({
      nome: this.cargo.nome,
      descricao: this.cargo.descricao,
      salario: this.cargo.salario
    })
  }
}