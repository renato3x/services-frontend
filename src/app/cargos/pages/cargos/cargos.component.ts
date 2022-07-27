import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { Cargo } from '../../models/cargo';
import { CargoService } from '../../services/cargo.service';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {

  cargo!: Cargo

  formCargo: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    descricao: [''],
    salario: ['', [Validators.required, Validators.min(0)]]
  })

  desabilitar: boolean = true
  naoEncontrado: boolean = false

  constructor(
    private route: ActivatedRoute,
    private cargoService: CargoService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Lista de Cargos")

    this.route.paramMap.subscribe(
      (params) => {
        let idCargo = parseInt(params.get('idCargo') ?? '0')
        this.recuperarCargo(idCargo)
      }
    )
  }

  recuperarCargo(idCargo: number): void {
    this.cargoService.getCargoById(idCargo)
      .subscribe(
        carg => {
          this.cargo = carg
          this.formCargo.setValue({
            nome: this.cargo.nome,
            descricao: this.cargo.descricao,
            salario: this.cargo.salario
          })

          this.valorMudou()
        },
        (erro: HttpErrorResponse) => {
          this.naoEncontrado = erro.status == 404

        }
      )
  }

  valorMudou() {
    this.formCargo.valueChanges
      .subscribe(
        (valores) => {
          this.desabilitar = this.formCargo.invalid || !(valores.nome != this.cargo.nome || valores.descricao != this.cargo.descricao || valores.salario != this.cargo.salario)
        })
  }


  atualizar(): void {
    const c: Cargo = { ...this.formCargo.value }
    c.idCargo = this.cargo.idCargo

    this.cargoService.atualizarCargo(c)
      .subscribe(
        (carg) => {
          this.snackbar.open('Cargo salvo com sucesso', 'Ok', {
            duration: 3000
          })
          this.recuperarCargo(carg.idCargo!)
        }
      )
  }

  deletar(cargo: Cargo): void {
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent)

    dialogRef.afterClosed()
      .subscribe(
        deletar => {
          if (deletar) {
            this.cargoService.deleteCargo(cargo).subscribe(
              () => {
                this.snackbar.open('Cargo deletado', 'Ok', {
                  duration: 3000
                })
                this.router.navigateByUrl('/cargos')
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