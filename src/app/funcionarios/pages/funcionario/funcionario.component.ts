import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  funcionario!: Funcionario

  constructor(
    private route: ActivatedRoute, // acessar os parâmetros da rota ativa
    private funcService: FuncionarioService
  ) { }

  ngOnInit(): void {
    // let idFuncionario = this.route.snapshot.paramMap.get('idFuncionario')

    this.route.paramMap.subscribe(
      (params) => {
        let idFuncionario = parseInt(params.get('idFuncionario') ?? '0')
        this.recuperarFuncionario(idFuncionario)
      }
    )
  }

  recuperarFuncionario(id: number): void {
    this.funcService.getFuncionarioById(id)
    .subscribe(
      func => {
        this.funcionario = func
      }
    )
  }
}
