import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mergeMap, Observable, tap } from 'rxjs';
import { Cliente } from '../../models/cliente';
import { Endereco } from '../../models/endereco';
import { ClienteService } from '../../services/cliente.service';
import { EnderecosService } from '../../services/enderecos.service';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})

export class FormClientesComponent implements OnInit {

  checked: boolean = false


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private enderecoService: EnderecosService,
    private snackbar: MatSnackBar,
    private dialogRef: DialogRef
  ) { }
  
  formCliente: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  })


  formEndereco: FormGroup = this.fb.group({
    rua: ['', [Validators.required]],
    bairro: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    uf: ['', [Validators.required]]
  })
  ngOnInit(): void {
  }

  getEnderecoPeloCep(cep: string){
    if(cep.length >= 8){
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe(
        endereco => this.popularForm(endereco)
        
      )
    }
  }

  popularForm(viacep: any){
    this.formEndereco.setValue({
      rua: viacep.logradouro,
      bairro: viacep.bairro,
      cidade: viacep.localidade,
      uf: viacep.uf
    })
  }

  cadastrarCliente(){
    const endereco = this.formEndereco.value
    const novoCliente: Cliente = this.formCliente.value;


    if(endereco.rua.length > 0){
      this.clienteService.cadastrarClientes(novoCliente).subscribe(
        cliente => {
          this.enderecoService.cadastrarEndereco(endereco, cliente.idCliente!).subscribe(
              () => {
                this.snackbar.open('Cliente salvo com sucesso', 'Ok', {
                  duration: 3000
                })
                this.dialogRef.close()
            }
          )
        }
      )
    } else {
      this.clienteService.cadastrarClientes(novoCliente).subscribe(
        () => {
          this.snackbar.open('Cliente salvo com sucesso', 'Ok', {
            duration: 3000
          })
          this.dialogRef.close()
      }
      )
    }
  }
}
  
