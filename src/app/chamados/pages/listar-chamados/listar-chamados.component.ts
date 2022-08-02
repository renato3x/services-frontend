import { Component, OnInit } from '@angular/core';

import { Chamado } from '../../models/chamado';
import { ChamadosService } from '../../services/chamados.service';
import { FormChamadoComponent } from '../../components/form-chamado/form-chamado.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';

@Component({
  selector: 'app-listar-chamados',
  templateUrl: './listar-chamados.component.html',
  styleUrls: ['./listar-chamados.component.css'],
})

export class ListarChamadosComponent implements OnInit {

  chamados!: Chamado[]
  colunas: Array<string> = ['id', 'titulo', 'data', 'status', 'descricao', 'pagamento', 'funcionario', 'cliente', 'actions'];

  constructor(
    private chamadosService: ChamadosService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.getChamados()
    this.titleService.setTitle("Listagem de Chamados")

    this.chamadosService.atualizarChamadosSub$.subscribe(
      (precisaAtualizar) => {
        if (precisaAtualizar) {
          this.recuperarChamados()
        }
      }
    )

  }

  recuperarChamados(): void {
    this.chamadosService.getChamados().subscribe(
      (carg) => {
        this.chamados = carg
      },
      (erro) => {
        console.log(erro)
      },
      () => {
        console.log('Dados enviados com sucesso')
      }
    )

  }
  abrirFormChamado() {
    const referenciaDialog = this.dialog.open(FormChamadoComponent)
    referenciaDialog.afterClosed().subscribe(
      () => {
        this.recuperarChamados()
      }
    )
  }

  getChamados() {
    this.chamadosService.getChamados().subscribe(
      (response) => {
        this.chamados = response
      }
    )
  }

  salvarChamado(chamado: Chamado) {
    const dialog = this.dialog.open(FormChamadoComponent)
    dialog.afterClosed()
      .subscribe(() => {
        this.getChamados();
      })
  }


  deletarChamado(idChamado: number): void {
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent)
    dialogRef.afterClosed()
      .subscribe(
        (deletar) => {
          if (deletar) {
            this.chamadosService.deletarChamado(idChamado)
              .subscribe(
                () => {
                  this.snackbar.open('Chamado deletado', 'Ok', {
                    duration: 3000
                  })
                  this.recuperarChamados()
                },
                (error) => {
                  this.snackbar.open('Não foi possível deletar o chamado', 'Ok', {
                    duration: 3000
                  })
                  console.log(error)
                }
              )
          }
        }
      )
  }
}