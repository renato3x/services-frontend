import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/funcionarios/models/cliente';
import { DeletarClienteComponent } from '../../componentes/deletar-cliente/deletar-cliente.component';
import { EditarClienteComponent } from '../../componentes/editar-cliente/editar-cliente.component';
import { FormClienteComponent } from '../../componentes/form-cliente/form-cliente.component';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = []
  colunas: Array<string> = ['id', 'nome', 'email', 'endereco', 'actions']

  formCliente: FormGroup = this.fb.group({
    nome: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    endereco: ['']
  })

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.clienteService.atualizar$.subscribe(
      () => {
        this.pegarTodosOsClientes()
      }
    )
  }

  pegarTodosOsClientes() {
    this.clienteService.pegarClientes().subscribe(
      (client) => {
        this.clientes = client
      }
    )
  }

  deletarCliente(id: number) {
    const dialogRef = this.dialog.open(DeletarClienteComponent)

    dialogRef.afterClosed().subscribe(
      (del) => {
        if (del) {
          this.clienteService.deletarCliente(id).subscribe(
            () => {
              this.snackbar.open('Cliente Deletado', 'Ok', {
                duration: 3000
              })
            }
          )
        }
      }
    )
  }

  dialogEdit(cliente: Cliente) {
    this.dialog.open(EditarClienteComponent, { data: cliente }).afterClosed().subscribe(
      () => {
        this.pegarTodosOsClientes()
      }
    )
  }

  abrirFormFuncionario(): void {
    const referenciaDialog = this.dialog.open(FormClienteComponent)

    referenciaDialog.afterClosed().subscribe(
      () => {
        this.pegarTodosOsClientes()
      }
    )
  }
}
