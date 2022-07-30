import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { FormCargosComponent } from '../../components/form-cargos/form-cargos.component';
import { Cargo } from '../../models/cargo';
import { CargoService } from '../../services/cargo.service';
import { CargoComponent } from '../cargo/cargo.component';

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
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Cargos Service")

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
      }
    )
  }

  abrirFormCargo(): void {

    const referenciaDialog = this.dialog.open(FormCargosComponent, {
      disableClose: true,
    })

    referenciaDialog.afterClosed().subscribe(
      () => {
        this.recuperarCargos()
      }
    )
  }
  editarCargo(cargo: Cargo) {
    const referenciaDialog = this.dialog.open(CargoComponent, {
      disableClose: true,
      data: cargo
    })

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
            this.cargoService.deleteCargo(cargo).subscribe(
              () => {
                this.snackbar.open('Cargo deletado', 'Ok', {
                  duration: 3000
                })
                this.recuperarCargos()
              },
              (error) => {
                this.snackbar.open('Não foi possivel excluir o cargo. Algum funcionario possui este cargo', 'Ok', {
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