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
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // 1° sucesso -> retorna os dados
    // 2° erro -> ocorre um erro na fonte de dados
    // 3° complete -> a fonte de dados te retorna tudo

    this.recuperarFuncionarios()
  }

  deletarFuncionario(id: number): void {
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent)

    dialogRef.afterClosed()
    .subscribe(
      deletar => {
        if (deletar) {
          this.funcService.deleteFuncionario(id)
          .subscribe(
            () => {
              this.snackbar.open('Funcionário deletado', 'Ok', {
                duration: 3000
              })
              this.recuperarFuncionarios()
            },
            (error) => {
              this.snackbar.open('Não possível deletar o funcionário', 'Ok', {
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
