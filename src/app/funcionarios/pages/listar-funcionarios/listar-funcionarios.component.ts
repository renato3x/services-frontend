import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

import { MatSnackBar } from '@angular/material/snack-bar';
import { CargoService } from 'src/app/cargos/services/cargo.service';
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
  colunas: Array<string> = ['id', 'nome', 'email', 'cargo', 'actions']

  constructor(
    private funcService: FuncionarioService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private titleService: Title,
    private cargo: CargoService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Listagem de Funcionarios")

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
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent)
    dialogRef.afterClosed()
    .subscribe(
      (deletar) => {
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
      (funcs) => {
        this.funcionarios = funcs.reverse()
      },
      (erro) => {
        console.log(erro)
      },
      () => {
        console.log('Dados enviados com sucesso')
      }
    )
  }

  abrirFormFuncionario(): void {
    const referenciaDialog = this.dialog.open(FormFuncionarioComponent)
    referenciaDialog.afterClosed().subscribe(
      () => {
        this.recuperarFuncionarios()
      }
    )
  }
}