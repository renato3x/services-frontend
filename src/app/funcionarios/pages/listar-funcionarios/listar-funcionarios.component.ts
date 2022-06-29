import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormFuncionarioComponent } from '../../components/form-funcionario/form-funcionario.component';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})
export class ListarFuncionariosComponent implements OnInit {

  funcionarios: Funcionario[] = []
  colunas: Array<string> = ['id', 'nome', 'email', 'actions']

  constructor(
    private funcService: FuncionarioService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // 1° sucesso -> retorna os dados
    // 2° erro -> ocorre um erro na fonte de dados
    // 3° complete -> a fonte de dados te retorna tudo

    this.recuperarFuncionarios()
  }

  deletarFuncionario(id: number): void {
    const deletar = confirm('Você realmente quer excluir esse funcionário?')

    if (deletar) {
      this.funcService.deleteFuncionario(id)
      .subscribe(
        () => {
          alert('Funcionário deletado!')
          this.recuperarFuncionarios()
        },
        (error) => {
          alert('Não foi possível deletar esse funcionário')
          console.log(error)
        }
      )
    }
  }

  recuperarFuncionarios(): void {
    this.funcService.getFuncionarios().subscribe(
      (funcs) => { // sucesso
        this.funcionarios = funcs.reverse()
        /**
         * o reverse reverterá o array para que na lista
         * os funcionários apareçam do mais novo para o mais
         * antigo
         */
      },
      (erro) => { // erro
        console.log(erro)
      },
      () => { // complete
        console.log('Dados enviados com sucesso')
      }
    )
  }

  abrirFormFuncionario(): void {
    // abrindo o formulário do funcionário
    // e recuperando a referência desse dialog e guardando na variável
    const referenciaDialog = this.dialog.open(FormFuncionarioComponent)

    /**
     * a função afterClosed() nos retorna um observable
     * que notifica quando o dialog acabou de ser fechado
     *
     * quando o dialog for fechado, chamaremos a função que
     * faz a requisição dos funcionários novamente.
     */
    referenciaDialog.afterClosed().subscribe(
      () => {
        this.recuperarFuncionarios()
      }
    )
  }
}
