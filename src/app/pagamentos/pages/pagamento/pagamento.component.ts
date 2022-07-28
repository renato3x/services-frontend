import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagamento } from '../../models/pagamento';
import { PagamentoService } from '../../services/pagamento.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  pagamento!: Pagamento
  desabilitar: boolean = true
  naoEncontrado: boolean = false

  pagamentos: Pagamento[] = []

  formPagamento: FormGroup = this.fb.group({
    valor: ['', [Validators.required, Validators.min(0)]],
    formPagamento: ['', [Validators.required]],
    status: ['']
  })

  constructor(
    private route: ActivatedRoute,
    private pagamentoService: PagamentoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        let idPagamento = parseInt(params.get('idPagamento') ?? '0')
        this.recuperarPagamento(idPagamento)
      }
    )
  }

  recuperarPagamento(id: number): void {
    this.pagamentoService.getPagamentoById(id)
      .subscribe(
        (pagtos) => {
          this.pagamento = pagtos

          this.formPagamento.setValue({
            valor: this.pagamento.valor,
            formPagamento: this.pagamento.formPagamento,
            status: this.pagamento.status
          })
          this.valorMudou()
        },
        (erro: HttpErrorResponse) => {
          this.naoEncontrado = erro.status == 404
        }
      )
  }

  atualizar() {
    const p: Pagamento = { ...this.formPagamento.value }
    p.idPagamento = this.pagamento.idPagamento

    const salvar$: Observable<any> = this.pagamentoService.atualizarPagamento(p)

    salvar$.subscribe(
      (pagtos) => {
        this.snackBar.open('Pagamento salvo com sucesso', ' Ok', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        this.recuperarPagamento(pagtos.idPagamento)
      }
    )
  }

  valorMudou() {
    this.formPagamento.valueChanges.subscribe(
      (valores) => {
        this.desabilitar = this.formPagamento.invalid || !(valores.valor != this.pagamento.valor || valores.formPagamento != this.pagamento.formPagamento || valores.status != this.pagamento.status)
      }
    )
  }
}
