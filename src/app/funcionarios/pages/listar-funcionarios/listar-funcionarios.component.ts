import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { CargoService } from 'src/app/cargos/services/cargo.service';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { FormFuncionarioComponent } from '../../components/form-funcionario/form-funcionario.component';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { FuncionarioComponent } from '../funcionario/funcionario.component';

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
    this.titleService.setTitle("Funcionarios Service")

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
                }
              )
          }
        }
      )
  }

  recuperarFuncionarios(): void {
    this.funcService.getFuncionarios().subscribe(
      (funcs) => {
        this.funcionarios = funcs
      },
      (erro) => {
        console.log(erro)
      }
    )
  }

  abrirFormFuncionario(): void {
    const referenciaDialog = this.dialog.open(FormFuncionarioComponent, {
      disableClose: true,

    })

    referenciaDialog.afterClosed().subscribe(
      () => {
        this.recuperarFuncionarios()
      }
    )
  }
  editar(f: Funcionario) {
    const dialog = this.dialog.open(FuncionarioComponent, { data: f })
    dialog.afterClosed().subscribe(() => {
      this.recuperarFuncionarios();
    })
  }
}