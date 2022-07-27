import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../service/cliente.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente!: Cliente

  formCliente: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: [''],
  })

  desabilitar: boolean = true
  naoEncontrado: boolean = false

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        let idCliente = parseInt(params.get('idCliente') ?? '0')
        this.recuperarCliente(idCliente)
      }
    )
  }

  recuperarCliente(idCliente: number): void {
    this.clienteService.getClienteById(idCliente)
    .subscribe(
      carg => {
      this.cliente = carg
      console.log((this.cliente))
      this.formCliente.setValue({
        nome: this.cliente.nome,
        email: this.cliente.email,

      })

      this.valorMudou()
      },
      (erro: HttpErrorResponse) => {
        this.naoEncontrado = erro.status == 404

      }
    )
  }

  valorMudou() {
    this.formCliente.valueChanges
    .subscribe(
      (valores) => {
        this.desabilitar = this.formCliente.invalid || !(valores.nome != this.cliente.nome || valores.email != this.cliente.email)
    })
  }


  atualizar(): void {
    const c: Cliente = {...this.formCliente.value}
    c.idCliente = this.cliente.idCliente

    this.clienteService.atualizarCliente(c)
    .subscribe(
      (carg) => {
        this.snackbar.open('Cliente salvo com sucesso', 'Ok', {
          duration: 3000
        })
        this.recuperarCliente(carg.idCliente!)
        }
        )
  }

  deletar(cliente: Cliente): void {
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent)

    dialogRef.afterClosed()
    .subscribe(
      deletar => {
        if (deletar) {
        this.clienteService.deleteCliente(cliente).subscribe(
          () => {
            this.snackbar.open('Cliente deletado', 'Ok', {
              duration: 3000
            })
            this.router.navigateByUrl('/clientes')
          },
          (error) => {
            this.snackbar.open('Não foi possível deletar o cliente', 'Ok', {
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
