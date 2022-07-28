import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagamentoService } from 'src/app/pagamentos/services/pagamento.service';

@Component({
  selector: 'app-add-pagamento',
  templateUrl: './add-pagamento.component.html',
  styleUrls: ['./add-pagamento.component.css']
})
export class AddPagamentoComponent implements OnInit {
  idChamado!: number
  salvandoPagamento: boolean = false
  formPagamento: FormGroup = this.fb.group({
    valor: ['', [Validators.required]],
    formPagamento: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder, private dialogref: MatDialogRef<AddPagamentoComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private pagamentoService: PagamentoService) { }

  ngOnInit(): void {
    this.idChamado = this.data
  }
  salvar() {
    this.salvandoPagamento = true
    this.pagamentoService.salvarPagamento(this.formPagamento.value, this.idChamado).subscribe(() => {
      this.dialogref.close()
    })
  }
}
