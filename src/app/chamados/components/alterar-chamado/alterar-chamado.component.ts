import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/funcionarios/models/funcionario';
import { FuncionarioService } from 'src/app/funcionarios/services/funcionario.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChamadosService } from '../../services/chamados.service';
import { Chamado } from '../../models/chamado';
import { Cliente } from 'src/app/clientes/models/cliente';
import { ConfirmarSaidaComponent } from '../confirmar-saida/confirmar-saida.component';


@Component({
  selector: 'app-alterar-chamado',
  templateUrl: './alterar-chamado.component.html',
  styleUrls: ['./alterar-chamado.component.css']
})
export class AlterarChamadoComponent implements OnInit {
  desabilitar: boolean = true;
  chamado!: Chamado;
  funcionarios!: Funcionario[]
  clientes!: Cliente[]

  formChamados: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    idFuncionario: [''],
    status: ['', Validators.required]
  })

  constructor(private funcionarioService: FuncionarioService,
    private fb: FormBuilder,
    private chamadosService: ChamadosService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AlterarChamadoComponent>,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.recuperarFuncionarios()
    this.recuperarChamado()
  }
  recuperarChamado() {
    this.chamado = this.data.chamado
    this.formChamados.setValue({
      titulo: this.data.chamado.titulo,
      descricao: this.data.chamado.descricao,
      idFuncionario: this.data.chamado.funcionario?.idFuncionario ?? '',
      status: this.data.chamado.status
    })
    this.valorMudou()
  }
  recuperarFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe(funcionarios => this.funcionarios = funcionarios)
  }

  salvar() {
    const c: Chamado = {
      idChamado: this.chamado.idChamado,
      titulo: this.formChamados.value.titulo,
      descricao: this.formChamados.value.descricao,
      status: this.formChamados.value.status
    }
    const idFuncionario = this.formChamados.value.idFuncionario

    this.chamadosService.putChamado(c, idFuncionario).subscribe(() => {
      this.dialogRef.close()
    })
  }

  valorMudou() {
    this.formChamados.valueChanges
      .subscribe(
        (valores) => {
          this.desabilitar = this.formChamados.invalid || !(valores.titulo != this.chamado.titulo || valores.descricao != this.chamado.descricao || valores.idFuncionario != this.chamado.funcionario?.idFuncionario || valores.status != this.chamado.status)
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

}