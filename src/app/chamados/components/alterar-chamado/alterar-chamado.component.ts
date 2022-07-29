import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/funcionarios/models/funcionario';
import { FuncionarioService } from 'src/app/funcionarios/services/funcionario.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChamadosService } from '../../services/chamados.service';
import { Chamado } from '../../models/chamado';
import { Cliente } from 'src/app/clientes/models/cliente';


@Component({
  selector: 'app-alterar-chamado',
  templateUrl: './alterar-chamado.component.html',
  styleUrls: ['./alterar-chamado.component.css']
})
export class AlterarChamadoComponent implements OnInit {
  chamado!: Chamado;
  funcionarios!: Funcionario[]
  clientes!: Cliente[]

  formChamados: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    idFuncionario: [''],
    status: ['', Validators.required]
  })

  constructor(private funcionarioService: FuncionarioService, private fb: FormBuilder, private chamadosService: ChamadosService, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AlterarChamadoComponent>) { }

  ngOnInit(): void {
    this.recuperarFuncionarios()
    this.chamado = this.data.chamado
    this.formChamados.setValue({
      titulo: this.data.chamado.titulo,
      descricao: this.data.chamado.descricao,
      idFuncionario: this.data.chamado.funcionario?.idFuncionario ?? '',
      status: this.data.chamado.status
    })
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
}