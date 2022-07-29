import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Cargo } from 'src/app/funcionarios/models/cargo';
import { CadastrarCargoComponent } from '../../components/cadastrar-cargo/cadastrar-cargo.component';
import { DeleteCargoComponent } from '../../components/delete-cargo/delete-cargo.component';
import { CargoServiceService } from '../../service/cargo-service.service';
import { EditarCargoComponent } from '../editar-cargo/editar-cargo.component';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {

  cargo: Cargo[] = []

  colunas: Array<string> = ['id', 'nome', 'descricao', 'salario', 'actions']
  dataSource = new MatTableDataSource<Cargo>();

  constructor(
    private cargoService: CargoServiceService,
    public authService: AuthService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.cargoService.atualizar$.subscribe(
      () => {
        this.pegarTodosOsCargos()
      }
    )
  }

  pegarTodosOsCargos() {
    this.cargoService.pegarCargos().subscribe(
      (carg) => {
        this.dataSource = new MatTableDataSource(carg)
        this.cargo = carg
      }
    )
  }

  deletarCargo(id: number | undefined) {
    const dialogRef = this.dialog.open(DeleteCargoComponent)

    dialogRef.afterClosed().subscribe(
      (deletar) => {
        if (deletar) {
          this.cargoService.deletarCargo(id).subscribe(
            () => {
              this.snackbar.open('Cargo Deletado', 'Ok', {
                duration: 2000
              })
              this.pegarTodosOsCargos()
            } 
          )
        }
      }
    )
  }

  abrirFormCargo(): void {
    const referenciaDialog = this.dialog.open(CadastrarCargoComponent)
    referenciaDialog.afterClosed().subscribe(
      () => {
        this.pegarTodosOsCargos()
      }
    )
  }

  dialogEdit(cargo: Cargo) {
    this.dialog.open(EditarCargoComponent, { data: cargo }).afterClosed().subscribe(
      () => {
        this.pegarTodosOsCargos()
      }
    )
  }

  /* Filtro da Tabela */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
