import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from 'src/app/clientes/services/cliente.service';
import { FuncionarioService } from 'src/app/funcionarios/services/funcionario.service';
import { ChamadosService } from '../../services/chamados.service';
import { Cliente } from 'src/app/clientes/models/cliente';
import { Funcionario } from 'src/app/funcionarios/models/funcionario';
import { Chamado } from '../../models/chamado';
import { Pagamento } from 'src/app/chamados/models/pagamento';
import { PagamentoService } from 'src/app/chamados/services/pagamento.service';
import { ConfirmarSaidaComponent } from '../confirmar-saida/confirmar-saida.component';

@Component({
  selector: 'app-form-chamado',
  templateUrl: './form-chamado.component.html',
  styleUrls: ['./form-chamado.component.css']
})
export class FormChamadoComponent implements OnInit {
  @Output()
  atualizar: EventEmitter<any> = new EventEmitter()

  checked: boolean = false

  funcionarios!: Funcionario[]
  clientes!: Cliente[]
  pagamento!: Pagamento
  chamado!: Chamado;

  formChamados: FormGroup = this.fb.group({
    idChamado: ['', [Validators.required]],
    titulo: ['', [Validators.required]],
    descricao: [''],
    status: ['', [Validators.required]],
    pagamento: [''],
    idFuncionario: ['', [Validators.required]]
  })
  
  formPagamentos: FormGroup = this.fb.group({
    valor: ['', [Validators.required, Validators.min(0)]],
    formPagamento: ['', [Validators.required]],
    statusP: ['']
  })


  salvandoChamado: boolean = false

  constructor(
    private chamadosService: ChamadosService,
    private funcionarioService: FuncionarioService,
    private clienteService: ClienteService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private pagamentoService: PagamentoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormChamadoComponent>
    ) { }

  ngOnInit(): void {
    this.recuperarFuncionarios()
    this.recuperarClientes()
    this.formPagamentos
  }
  
  recuperarFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe(funcionarios => this.funcionarios = funcionarios)
  }

  recuperarClientes() {
    this.clienteService.getClientes().subscribe(clientes => this.clientes = clientes)
  }

  inserirPagamento() {
    Object.assign(this.pagamento, this.formPagamentos.value)
    this.pagamentoService.atualizarPagamento(this.pagamento).subscribe(() => {
      this.snackbar.open('Pagamento atualizado com sucesso', ' Ok', {
        duration: 3000
      })
      this.dialogRef.close()
    })
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
        valor: this.formPagamentos.value.valor,
        status: this.formPagamentos.value.statusP,
        formPagamento: this.formPagamentos.value.valor
      }
      if (this.chamado.pagamento) {
        p.idPagamento = this.chamado.pagamento.idPagamento
        this.pagamentoService.atualizarPagamento(p)
      } else {
        this.pagamentoService.cadastrarPagamento(p, this.chamado.idChamado!)
      }
    }
    this.chamadosService.editarChamado(c, idFuncionario).subscribe(
      () => {
      })
  }

  sair() {
    if (this.formChamados.value.titulo.length > 0 || this.formChamados.value.descricao.length > 0 || this.formChamados.value.idCliente) {
      this.matDialog.open(ConfirmarSaidaComponent)
        .afterClosed().subscribe(
          (response) => {
            if (response) {
              this.dialogRef.close()
            }
          }
        )
    } else {
      this.dialogRef.close()
    }
  }
}