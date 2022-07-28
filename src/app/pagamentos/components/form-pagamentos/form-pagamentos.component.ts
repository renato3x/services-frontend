import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, subscribeOn } from 'rxjs';
import { Chamado } from 'src/app/chamados/models/chamado';
import { ChamadosService } from 'src/app/chamados/services/chamados.service';
import { Pagamento } from '../../models/pagamento';
import { PagamentoService } from '../../services/pagamento.service';

@Component({
  selector: 'app-form-pagamentos',
  templateUrl: './form-pagamentos.component.html',
  styleUrls: ['./form-pagamentos.component.css']
})
export class FormPagamentosComponent implements OnInit {

  formPagamento: FormGroup = this.fb.group({
    valor: ['', [Validators.required]],
    formPagamento: ['', [Validators.required]],
    
    idChamado: ['', [Validators.required]]
  })

  salvandoPagamento: boolean = false
  
  chamados: Chamado[] = []

  constructor(
    private fb: FormBuilder,
    private pagamentoService: PagamentoService,
    private dialogRef: MatDialogRef<FormPagamentosComponent>,
    private snackBar: MatSnackBar  ,
    private chamado: ChamadosService  
  ) { }

  ngOnInit(): void {
    this.mostrarChamados()
  }

  salvar():void{
    this.salvandoPagamento = true
    const p: Pagamento = this.formPagamento.value
    const idChamado: number = this.formPagamento.value.idChamado
    let obsSalvar: Observable<any>

    obsSalvar = this.pagamentoService.salvarPagamento(p, idChamado)
    
    obsSalvar.subscribe(
      () => {
        this.snackBar.open('Pagamento salvo com sucesso', 'Ok', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        this.dialogRef.close()
      }
    )
  }

  mostrarChamados(){
    this.chamado.getChamados().subscribe(
      (chamados) => {
        this.chamados = chamados
      }
    )
  }
}
