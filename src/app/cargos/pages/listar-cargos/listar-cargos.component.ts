import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { FormCargoComponent } from '../../components/form-cargo/form-cargo.component';
import { Cargo } from '../../models/cargo';
import { CargoService } from '../../services/cargo.service';

@Component({
  selector: 'app-listar-cargos',
  templateUrl: './listar-cargos.component.html',
  styleUrls: ['./listar-cargos.component.css']
})

export class ListarCargosComponent implements OnInit {

  cargos: Cargo[] = []
  colunas: Array<string> = ['id', 'nome', 'descricao', 'salario', 'actions']

  constructor(
    private cargoService: CargoService,
    private dialog: MatDialog,
    private titleService: Title,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Listagem de Cargos")


    this.cargoService.atualizarCargosSub$.subscribe(
      (precisaAtualizar) => {
        if (precisaAtualizar) {
          this.recuperarCargos()
        }
      }
    )
  }

  recuperarCargos(): void {
    this.cargoService.getCargos().subscribe(
      (carg) => {
        this.cargos = carg
      },
      (erro) => {
        console.log(erro)
      },
      () => {
        console.log('Dados enviados com sucesso')
      }
    )
  }

  abrirFormCargo(): void {
    const referenciaDialog = this.dialog.open(FormCargoComponent)
    referenciaDialog.afterClosed().subscribe(
      () => {
        this.recuperarCargos()
      }
    )
  }

  deletarCargo(cargo: Cargo): void {
    const referenciaDialog = this.dialog.open(ConfirmarDelecaoComponent)
    referenciaDialog.afterClosed()
      .subscribe(
        deletar => {
          if (deletar) {
            this.cargoService.deleteCargo(cargo)
            .subscribe(
              () => {
                this.snackbar.open('Cargo deletado', 'Ok', {
                  duration: 3000
                })
                this.recuperarCargos()
              },
              (error) => {
                this.snackbar.open('Não foi possível deletar o cargo', 'Ok', {
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