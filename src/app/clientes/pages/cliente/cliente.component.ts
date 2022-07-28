import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { Cliente } from '../../models/cliente';
import { Endereco } from '../../models/endereco';
import { ClienteService } from '../../services/cliente.service';
import { EnderecosService } from '../../services/enderecos.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente!: Cliente;

  checked: boolean = false

  naoEncontrado: boolean = false

  desabilitar!: boolean

  formCliente: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  })

  formEndereco: FormGroup = this.fb.group({
    rua: '',
    bairro: '',
    cidade: '',
    uf: ''
  })

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private titleService: Title
  ) { }


  ngOnInit(): void {

    this.titleService.setTitle("Lista de Clientes")

      this.route.paramMap.subscribe(
        params => {
          let idCliente = parseInt(params.get('idCliente') ?? '0')
          this.buscarClientePeloId(idCliente)
        }
      )

      this.valorMudou();
  }


  ngOnChange(){

  }

  buscarClientePeloId(idCliente: number){
    this.clienteService.buscarClientePorId(idCliente).subscribe(
      cliente => {
        this.cliente = cliente,
        this.formCliente.setValue({
          nome: this.cliente.nome,
          email: this.cliente.email
        })

        if(cliente.enderecoCliente != null){
          this.formEndereco.setValue({
            rua: cliente.enderecoCliente?.rua,
            bairro: cliente.enderecoCliente?.bairro,
            cidade: cliente.enderecoCliente?.cidade,
            uf: cliente.enderecoCliente?.uf,
          })
        } else{
          this.formEndereco.setValue({
            rua: '',
            bairro: '',
            cidade: '',
            uf: ''
          })
        }
      },
      error => {
        console.log(error)
        this.naoEncontrado = error.status == 500
      }
    )
  }

  valorMudou(){
    this.formEndereco.valueChanges.subscribe(
      (valores) => {
        const endereco = this.formEndereco.value
        this.desabilitar = ((endereco.rua?.length || endereco.bairro?.length || endereco.cidade?.length || endereco.uf?.length ) <= 0) || !(valores.rua != this.cliente.enderecoCliente?.rua || 
          valores.bairro != this.cliente.enderecoCliente?.bairro || valores.cidade != this.cliente.enderecoCliente?.cidade || 
          valores.uf != this.cliente.enderecoCliente?.uf)})
    
    if(!this.desabilitar){}
    this.formCliente.valueChanges.subscribe(
      (valores) => {
        this.desabilitar = this.formCliente.invalid || !(valores.nome != this.cliente.nome || valores.email != this.cliente.email)
        }
      )
    }
  

  editarCliente(){
    const novoCliente: Cliente = this.formCliente.value;
    novoCliente.idCliente = this.cliente.idCliente as number;

    const novoEndereco: Endereco = this.formEndereco.value;
    novoEndereco.idEndereco = this.cliente.enderecoCliente?.idEndereco;

    if(this.formEndereco.value.rua.length > 0){
      this.clienteService.editarClientes(novoCliente, novoCliente.idCliente, novoEndereco).subscribe(
        () => {
          this.snackbar.open('Funcionário salvo com sucesso', 'Ok', {
            duration: 3000
          })
          this.buscarClientePeloId(this.cliente.idCliente!)
        }
      )
    } else {
      this.clienteService.editarClientes(novoCliente, novoCliente.idCliente).subscribe(
        () => {
          this.snackbar.open('Funcionário salvo com sucesso', 'Ok', {
            duration: 3000
          })
          this.buscarClientePeloId(this.cliente.idCliente!)
        }
      )
    }
  }

  deletar(): void {
    this.dialog.open(ConfirmarDelecaoComponent)
      .afterClosed()
      .subscribe(
        (deletar) => {
          if (deletar) {
            this.clienteService.deletarCliente(this.cliente.idCliente as number)
              .subscribe(
                () => {
                  this.snackbar.open('Funcionário deletado', 'Ok', {
                    duration: 3000
                  })
                  this.router.navigateByUrl('/clientes')
                }
              )
          }
        }
      )
  }
}
