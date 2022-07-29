import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/funcionarios/models/cliente';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {

  formCliente: FormGroup = this.fb.group({
    nome: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    endereco: ['']
  })

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<FormClienteComponent>
  ) { }

  ngOnInit(): void {
  }

  salvar(): void {
    const cl: Cliente = this.formCliente.value
    let obsSalvar: Observable<any>

    obsSalvar = this.clienteService.cadastrarCliente(cl)

    obsSalvar.subscribe(
      () => {
        this.snackbar.open('Cliente Cadastrado com sucesso', 'Ok', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        this.dialogRef.close()
      }
    )
  }
}
