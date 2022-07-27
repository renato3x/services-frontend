import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClientesComponent implements OnInit {


  formCliente: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: [''],
  })

  salvandoCliente: boolean = false

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private dialogRef: MatDialogRef<FormClientesComponent>,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  salvar(): void {
    this.salvandoCliente = true
    const c: Cliente = this.formCliente.value

    this.clienteService.salvarCliente(c).subscribe(
      () => {
        this.snackbar.open('Cliente salvo com sucesso.', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close()
      }
    )
  }

}
