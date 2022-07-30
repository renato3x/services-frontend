import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PagamentoService } from 'src/app/pagamentos/services/pagamento.service';
import { Pagamento } from 'src/app/pagamentos/models/pagamento';
import { ConfirmarSaidaComponent } from '../confirmar-saida/confirmar-saida.component';

@Component({
  selector: 'app-edit-pagamento',
  templateUrl: './edit-pagamento.component.html',
  styleUrls: ['./edit-pagamento.component.css']
})
export class EditPagamentoComponent implements OnInit {
  desabilitar = true
  pagamento!: Pagamento
  formPagamento: FormGroup = this.fb.group({
    valor: ['', [Validators.required, Validators.min(0)]],
    formPagamento: ['', [Validators.required]],
    status: ['']
  })

  constructor(
    private pagamentoService: PagamentoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogref: MatDialogRef<EditPagamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.recuperarPagamento()
  }

  recuperarPagamento() {
    this.pagamento = this.data;
    this.formPagamento.setValue({
      valor: this.pagamento.valor,
      formPagamento: this.pagamento.formPagamento,
      status: this.pagamento.status
    }
    )
    this.valorMudou()
  }
  atualizar() {
    Object.assign(this.pagamento, this.formPagamento.value)
    this.pagamentoService.atualizarPagamento(this.pagamento).subscribe(() => {
      this.snackBar.open('Pagamento atualizado com sucesso', ' Ok', {
        duration: 3000
      })
      this.dialogref.close()
    })
  }

  valorMudou() {
    this.formPagamento.valueChanges
      .subscribe(
        (valores) => {
          this.desabilitar = this.formPagamento.invalid || !(valores.valor != this.pagamento.valor || valores.formPagamento != this.pagamento.formPagamento || valores.status != this.pagamento.status)
        })
  }
  sair() {
    if (!this.desabilitar) {
      this.dialog.open(ConfirmarSaidaComponent)
        .afterClosed().subscribe(
          (response) => {
            if (response) {
              this.dialogref.close()
            }
          }
        )
    } else {
      this.dialogref.close()
    }
  }
}