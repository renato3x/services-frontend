import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

clientes!:Cliente[]
colunas: Array<string> = ['id','nome','email','actions']
  constructor() { }

  ngOnInit(): void {
  }

}
