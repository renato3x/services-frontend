import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CargosServiceService } from 'src/app/cargos/service/cargos-service.service';
import { Cliente } from '../../models/cliente';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css']
})
export class CadastrarClienteComponent implements OnInit {
  formClientes: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
   
  });

 
  constructor(
    private fb: FormBuilder,
   
    private dialogRef: MatDialogRef<CadastrarClienteComponent>,
    private snackbar: MatSnackBar, 
    private clienteService: ClientesService
  ) {}
 

  ngOnInit(): void {
  }
  cadastrarCliente(){
    const dadosCliente:Cliente = this.formClientes.value
    this.clienteService.cadastrarCliente(dadosCliente).subscribe(()=>{
      this.dialogRef.close()
    })
  }

}
