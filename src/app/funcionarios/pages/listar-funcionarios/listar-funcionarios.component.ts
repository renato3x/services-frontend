import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
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
    private dialog: MatDialog, // responsável por abrir o componente confirmar-delecao na tela
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // 1° sucesso -> retorna os dados
    // 2° erro -> ocorre um erro na fonte de dados
    // 3° complete -> a fonte de dados te retorna tudo

    this.funcService.atualizarFuncionariosSub$
    .subscribe(
      (precisaAtualizar) => {
        if (precisaAtualizar) {
          this.recuperarFuncionarios()
        }
      }
    )
  }

  deletarFuncionario(func: Funcionario): void {
    /**
     * A função open() do dialog vai abrir o seu componente
     * na tela como uma caixa de dialogo, basta informar
     * a classe do componente que ele precisa abrir pra você
     *
     * e ele te retornará uma referência desse componente que está
     * aberto na sua tela
     */
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent)

    /**
     * A função afterClosed() te retorna um observable
     * que manda os dados que serão enviados para você
     * quando esse dialog for fechado
     */
    dialogRef.afterClosed()
    .subscribe(
      (deletar) => {
        /**
         * o parâmetro deletar vai me retornar um valor booleano
         * como foi colocado no componente do confirmar-delecao
         *
         * se deletar for TRUE, apagaremos o funcionário, se não,
         * nada acontecerá
         */
        if (deletar == true) {
          this.funcService.deleteFuncionario(func)
          .subscribe(
            () => {
              this.snackbar.open('Funcionário deletado', 'Ok', {
                duration: 3000
              })
              this.recuperarFuncionarios()
            },
            (error) => {
              this.snackbar.open('Não foi possível deletar o funcionário', 'Ok', {
                duration: 3000
              })
              console.log(error)
            }
          )
        }
      }
    )
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
