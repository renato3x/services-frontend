import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ClienteService } from 'src/app/clientes/service/cliente.service';
import { FuncionarioService } from 'src/app/funcionarios/services/funcionario.service';
import { ChamadosService } from '../../services/chamados.service';
import { Cliente } from 'src/app/clientes/models/cliente';
import { Funcionario } from 'src/app/funcionarios/models/funcionario';
import { Chamado } from '../../models/chamado';
import { ConfirmarSaidaComponent } from '../confirmar-saida/confirmar-saida.component';
@Component({
  selector: 'app-form-chamado',
  templateUrl: './form-chamado.component.html',
  styleUrls: ['./form-chamado.component.css']
})
export class FormChamadoComponent implements OnInit {
  @Output()
  atualizar: EventEmitter<any> = new EventEmitter()
  funcionarios!: Funcionario[]
  clientes!: Cliente[]

  formChamados: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    descricao: [''],
    idCliente: ['', [Validators.required]],
  })

  constructor(private chamadosService: ChamadosService, private snackbar: MatSnackBar, private titleService: Title, private funcionarioService: FuncionarioService, private clienteService: ClienteService, private fb: FormBuilder, private dialogRef: MatDialogRef<FormChamadoComponent>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.recuperarFuncionarios()
    this.recuperarClientes()
  }


  cadastrarChamado() {
    const idCliente = this.formChamados.value.idCliente
    const chamado: Chamado = {
      titulo: this.formChamados.value.titulo,
      descricao: this.formChamados.value.descricao,
    }

    this.chamadosService.postChamado(chamado, idCliente).subscribe(chamado => {
      this.dialogRef.close()
      this.snackbar.open('Chamado salvo com sucesso', 'Ok', {
        duration: 3000
      })
    })
  }

  recuperarFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe(funcionarios => this.funcionarios = funcionarios)
  }

  recuperarClientes() {
    this.clienteService.getClientes().subscribe(clientes => this.clientes = clientes)
  }
  sair() {
    if (this.formChamados.value.titulo.length > 0 || this.formChamados.value.descricao.length > 0 || this.formChamados.value.idCliente) {
      this.dialog.open(ConfirmarSaidaComponent)
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
