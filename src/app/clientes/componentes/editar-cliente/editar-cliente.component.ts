import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/funcionarios/models/cliente';
import { ClienteComponent } from '../../pages/cliente/cliente.component';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente!: Cliente

  formCliente: FormGroup = this.fb.group({
    nome: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    idEndereco: ['']
  })

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ClienteComponent>
  ) { }

  ngOnInit(): void {
    this.cliente = this.data
    this.recuperarCliente()
  }

  salvarAtualizacoes() {
    Object.assign(this.cliente, this.formCliente.value)

    const obsSalvar: Observable<any> = this.clienteService.atualizarCliente(this.cliente)

    obsSalvar
      .subscribe(
        (client) => {
          this.snackbar.open('Cliente salvo com sucesso', 'Ok', {
            duration: 3000
          })

          this.dialogRef.close()
        }
      )
    this.snackbar.open('Cliente salvo com sucesso', 'Ok', {
      duration: 3000
    })
  }

  recuperarCliente(): void {
    this.formCliente.setValue({
      nome: this.cliente.nome,
      email: this.cliente.email,
      idEndereco: this.cliente.enderecoCliente
    })
  }
}
