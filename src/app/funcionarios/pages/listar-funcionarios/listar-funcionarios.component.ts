import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})
export class ListarFuncionariosComponent implements OnInit {

  funcionarios: Funcionario[] = []
  colunas: Array<string> = ['id', 'email', 'nome']

  constructor(
    private funcService: FuncionarioService
  ) { }

  ngOnInit(): void {
    // 1° sucesso -> retorna os dados
    // 2° erro -> ocorre um erro na fonte de dados
    // 3° complete -> a fonte de dados te retorna tudo

    this.funcService.getFuncionarios().subscribe(
      function(funcs) { // sucesso
        console.log(funcs)
      },
      function(erro) { // erro
        console.log(erro)
      },
      function() { // complete
        console.log('Dados enviados com sucesso')
      }
    )
  }
}
