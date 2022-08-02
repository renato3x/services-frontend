import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cargo } from '../../models/cargo';
import { CargoService } from '../../services/cargo.service';

@Component({
  selector: 'app-form-cargos',
  templateUrl: './form-cargo.component.html',
  styleUrls: ['./form-cargo.component.css']
})
export class FormCargoComponent implements OnInit {

  formCargo: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    descricao: [''],
    salario: ['', [Validators.required, Validators.min(0)],]
  })

  salvandoCargo: boolean = false

  constructor(
    private fb: FormBuilder,
    private cargoService: CargoService,
    private dialogRef: MatDialogRef<FormCargoComponent>,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  salvar(): void {
    this.salvandoCargo = true
    const c: Cargo = this.formCargo.value

    this.cargoService.salvarCargo(c).subscribe(
      () => {
        this.snackbar.open('Cargo salvo com sucesso.', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close()
      }
    )
  }

}