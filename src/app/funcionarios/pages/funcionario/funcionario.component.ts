import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  constructor(
    private route: ActivatedRoute // acessar os parâmetros da rota ativa
  ) { }

  ngOnInit(): void {
    let idFuncionario = this.route.snapshot.paramMap.get('idFuncionario')
    console.log(idFuncionario)
  }
}
