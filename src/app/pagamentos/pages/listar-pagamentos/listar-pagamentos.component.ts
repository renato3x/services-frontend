import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Pagamento } from '../../models/pagamento';
import { PagamentoService } from '../../services/pagamento.service';

@Component({
  selector: 'app-listar-pagamentos',
  templateUrl: './listar-pagamentos.component.html',
  styleUrls: ['./listar-pagamentos.component.css']
})
export class ListarPagamentosComponent implements OnInit {

  pagamentos: Pagamento[] = []

  colunas: Array<string> = ['id', 'valor', 'formaDePagamento', 'statusDoPagamento']

  constructor(
    private pagamentoService: PagamentoService,
    private dialog: MatDialog,
    private titleService: Title,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Pagamentos Service')

    this.pagamentoService.atualizarPagamentosSub$.subscribe(
      (precisaAtualizar) => {
        if (precisaAtualizar) {
          this.recuperarPagamentos()
        }
      }
    )
  }

  recuperarPagamentos(): void {
    this.pagamentoService.getPagamentos()
      .subscribe(
        (pagtos) => {
          this.pagamentos = pagtos.reverse()
        }
      )
  }

}
