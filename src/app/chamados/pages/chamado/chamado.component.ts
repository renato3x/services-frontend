import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ChamadosService } from '../../services/chamados.service';
import { Chamado } from '../../models/chamado';

import { Funcionario } from '../../../funcionarios/models/funcionario';
import { FuncionarioService } from '../../../funcionarios/services/funcionario.service';

import { ClienteService } from '../../../clientes/services/cliente.service';
import { Cliente } from '../../../clientes/models/cliente';
import { Title } from '@angular/platform-browser';

import { PagamentoService } from '../../services/pagamento.service';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { Pagamento } from '../../models/pagamento';
import { ConfirmarSaidaComponent } from '../../components/confirmar-saida/confirmar-saida.component';

@Component({
  selector: 'app-chamado',
  templateUrl: './chamado.component.html',
  styleUrls: ['./chamado.component.css']
})

export class ChamadoComponent implements OnInit {

  desabilitar: boolean = true
  naoEncontrado: boolean = false
  checked: boolean = false

  chamado!: Chamado;
  funcionarios!: Funcionario[]
  clientes!: Cliente[]
  pagamentos!: Pagamento[]

  pagamento!: Pagamento


  formChamados: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    descricao: [''],
    status: ['', [Validators.required]],
    idFuncionario: [''],
    valor: [''],
    formPagamento: [''],
    statusP: ['']
  })

  constructor(
    private funcionarioService: FuncionarioService,
    private clienteService: ClienteService,
    private pagamentoService: PagamentoService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private titleService: Title,
    private chamadosService: ChamadosService,
    private dialogRef: MatDialogRef<ChamadoComponent>,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.recuperarFuncionarios()
    this.recuperarClientes()

    this.titleService.setTitle("Lista de Chamados")

    this.route.paramMap.subscribe(
      (params) => {
        let idChamado = parseInt(params.get('idChamado') ?? '0')
        this.recuperarChamado(idChamado)
      }
    )
    
  }

  recuperarChamado(idChamado: number): void {
    this.chamadosService.buscarChamadoPorId(idChamado)
      .subscribe(
        chamad => {
          this.chamado = chamad
          this.formChamados.setValue({
            titulo: this.chamado.titulo,
            descricao: this.chamado.descricao,
            status: this.chamado.status,
            idFuncionario: this.chamado.funcionario?.idFuncionario ?? '',
            valor: this.chamado.pagamento?.valor ?? '',
            statusP: this.chamado.pagamento?.status ?? '',
            formPagamento: this.chamado.pagamento?.formPagamento ?? '',
          })
            this.valorMudou()
        },
        (erro: HttpErrorResponse) => {
          this.naoEncontrado = erro.status == 404

        }
      )
  }

  recuperarFuncionarios() {
    this.funcionarioService.getFuncionarios()
      .subscribe(
        funcionarios => this.funcionarios = funcionarios
      )
  }

  recuperarClientes() {
    this.clienteService.getClientes()
      .subscribe(
        clientes => this.clientes = clientes
      )
  }

  recuperarPagamentos() {
    this.pagamentoService.getPagamentos()
      .subscribe(
        pagamentos => this.pagamentos = pagamentos
      )
  }

  valorMudou() {
    this.formChamados.valueChanges
      .subscribe(
        (valores) => {
          this.desabilitar = this.formChamados.invalid || !(
            valores.titulo != this.chamado.titulo ||
            valores.descricao != this.chamado.descricao ||
            valores.status != this.chamado.status ||
            valores.idFuncionario != this.chamado.funcionario?.nome
          )
        }
      )
  }

  close() {
    if (!this.desabilitar) {
      const dialog = this.dialog.open(ConfirmarSaidaComponent)
      dialog.afterClosed().subscribe((response) => {
        if (response == false) {
          return
        } else {
          this.dialogRef.close()
        }
      })
    } else {
      this.dialogRef.close()
    }
  }


  deletar(): void {
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent)

    dialogRef.afterClosed()
      .subscribe(
        deletar => {
          if (deletar) {
            this.chamadosService.deletarChamado(this.chamado.idChamado as number)
              .subscribe(
                () => {
                  this.snackbar.open('Chamado deletado', 'Ok', {
                    duration: 3000
                  })
                  this.router.navigateByUrl('/chamados')
                }
              )
          }
        }
      )
  }


  buscarChamadoPeloId(idChamado: number) {
    this.chamadosService.buscarChamadoPorId(idChamado)
    .subscribe(
      chamado => {
        this.chamado = chamado,
          this.formChamados.setValue({
            titulo: this.chamado.titulo,
            descricao: this.chamado.descricao
          })
        if (this.pagamento) {
          this.formChamados.setValue({
            valor: this.pagamento.valor,
            statusP: this.pagamento.status,
            formPagamento: this.pagamento.formPagamento
          })
        } else {
          this.formChamados.setValue({
            valor: '',
            statusP: '',
            formPagamento: ''
          })
        }
      },
      error => {
        console.log(error)
        this.naoEncontrado = error.status == 500
      }
    )
  }

  
  salvar() {
    const c: Chamado = {
      idChamado: this.chamado.idChamado,
      titulo: this.formChamados.value.titulo,
      descricao: this.formChamados.value.descricao,
      status: this.formChamados.value.status
    }

    c.cliente = this.chamado.cliente
    const idFuncionario = this.formChamados.value.idFuncionario
    if (this.checked) {
      // atualizar pagamento
      const p: Pagamento = {
        valor: this.formChamados.value.valor,
        status: this.formChamados.value.statusP,
        formPagamento: this.formChamados.value.formPagamento
      }
      if (this.chamado.pagamento) {
        p.idPagamento = this.chamado.pagamento.idPagamento
        this.pagamentoService.atualizarPagamento(p)
      } else {
        this.pagamentoService.atualizarPagamento(p)
      }
    }
    this.chamadosService.editarChamado(c, idFuncionario).subscribe(
      () => {
      })
  }

}





