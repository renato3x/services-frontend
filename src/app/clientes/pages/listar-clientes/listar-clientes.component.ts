import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { FormClientesComponent } from '../../components/form-clientes/form-clientes.component';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { EnderecosService } from '../../services/enderecos.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  clientes!: Cliente[];
  colunas: Array<string> = ['id', 'nome', 'email', 'endereco','actions']


  constructor(
    private clienteService: ClienteService,
    private enderecosService: EnderecosService,
    private matDialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.clienteService.atualizarClientes$.subscribe( (precisaAtualizar) => {
      if(precisaAtualizar){
        this.getClientes();
      }
    })
  
    this.enderecosService.atualizarEndereco$.subscribe( (precisaAtualizar) => {
      if(precisaAtualizar){
        this.getClientes()
      }
    })
  }


  getClientes(): void{
    this.clienteService.getClientes().subscribe(
      clientes => {
        this.clientes = clientes
        console.log(clientes)
      }
    )
  }

  abrirFormCliente(): void{
    this.matDialog.open(FormClientesComponent)
  }



  deletarCliente(idCliente: number): void {
    this.matDialog.open(ConfirmarDelecaoComponent)
      .afterClosed()
      .subscribe(
        (deletar) => {
          if (deletar) {
            this.clienteService.deletarCliente(idCliente)
              .subscribe(
                () => {
                  this.snackbar.open('Funcionário deletado', 'Ok', {
                    duration: 3000
                  })
                }
              )
          }
        }
      )
  }
}
