import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AtualizarClienteComponent } from '../../components/atualizar-cliente/atualizar-cliente.component';
import { CadastrarClienteComponent } from '../../components/cadastrar-cliente/cadastrar-cliente.component';
import { DeletarClientesComponent } from '../../components/deletar-clientes/deletar-clientes.component';
import { Cliente } from '../../models/cliente';
import { ClientesService } from '../../services/clientes.service';


@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

clientes!:Cliente[]
colunas: Array<string> = ['id','nome','email','actions']
  constructor(
    private clienteService:ClientesService,
    private dialog : MatDialog
    ) { }



  ngOnInit(): void {
    this.recuperarClientes()
  }
  recuperarClientes(){
    this.clienteService.getClientes().subscribe((clientesX)=>{
      this.clientes=clientesX
    })
  }
 
  abrirFormCliente(){
    const dialog = this.dialog.open(CadastrarClienteComponent)
    dialog.afterClosed().subscribe(()=>{
      this.recuperarClientes()
    })
  }

  AtualizarCliente(cliente:Cliente){
    const dialog = this.dialog.open(AtualizarClienteComponent,{data:cliente})
    dialog.afterClosed().subscribe(()=>{
      this.recuperarClientes()
    })
  }

  abrirDialogDeExcluir(id:number){
    const dialog =this.dialog.open(DeletarClientesComponent)

    dialog.afterClosed().subscribe((confirme)=>{
      if(confirme == true){
        this.clienteService.deleteCliente(id).subscribe(()=>{
          this.recuperarClientes()
        })
      }
      
  })
  }


}
