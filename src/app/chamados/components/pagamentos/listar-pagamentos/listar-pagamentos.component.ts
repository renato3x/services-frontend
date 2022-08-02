import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Chamado } from 'src/app/chamados/models/chamado';
import { ChamadosService } from 'src/app/chamados/services/chamados.service';
import { Pagamento } from '../../../models/pagamento';
import { PagamentoService } from '../../../services/pagamento.service';


@Component({
  selector: 'app-listar-pagamentos',
  templateUrl: './listar-pagamentos.component.html',
  styleUrls: ['./listar-pagamentos.component.css']
})
export class ListarPagamentosComponent implements OnInit {

  pagamentos: Pagamento[] = []
  chamados!: Chamado[]
  colunas: Array<string> = ['id', 'valor', 'formPagamento', 'status']

  constructor(
    private chamadosService: ChamadosService,
    private pagamentoService: PagamentoService,
    private titleService: Title,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Listagem de Pagamentos')

    this.pagamentoService.atualizarPagamentosSub$.subscribe(
      (precisaAtualizar) => {
        if (precisaAtualizar) {
          this.recuperarPagamentos()
        }
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  recuperarPagamentos(): void {
    this.pagamentoService.getPagamentos()
      .subscribe(
        (pagtos) => {
          this.pagamentos = pagtos.reverse()
        }
      )
  }

  getChamados() {
    this.chamadosService.getChamados().subscribe(
      (response) => {
        this.chamados = response
      }
    )
  }


}