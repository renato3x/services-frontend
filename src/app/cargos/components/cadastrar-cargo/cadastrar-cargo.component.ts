import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Cargo } from 'src/app/funcionarios/models/cargo';
import { CargoServiceService } from '../../service/cargo-service.service';

@Component({
  selector: 'app-cadastrar-cargo',
  templateUrl: './cadastrar-cargo.component.html',
  styleUrls: ['./cadastrar-cargo.component.css']
})
export class CadastrarCargoComponent implements OnInit {

  formCargo: FormGroup = this.fb.group({
    nome: ['', [ Validators.required ]],
    descricao: ['', [ Validators.required, Validators.email ]],
    salario: ['', [ Validators.required ]]
  })

  constructor(
    private fb: FormBuilder,
    private cargoService: CargoServiceService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<CadastrarCargoComponent>
  ) { }

  ngOnInit(): void {
  }

  salvar(): void {
    const c: Cargo = this.formCargo.value
    let obsSalvar: Observable<any>

    obsSalvar = this.cargoService.cadastrarCargo(c)

    obsSalvar.subscribe(
      () => {
        this.snackbar.open('Cargo Cadastrado com sucesso', 'Ok', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        this.dialogRef.close()
      }
    )
  }

  localStorageSave() {
    localStorage.setItem('dadosCargo', this.formCargo.value)
  }
}
