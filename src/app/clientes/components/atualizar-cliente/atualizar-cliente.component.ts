import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CargosServiceService } from 'src/app/cargos/service/cargos-service.service';
import { Cliente } from '../../models/cliente';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-atualizar-cliente',
  templateUrl: './atualizar-cliente.component.html',
  styleUrls: ['./atualizar-cliente.component.css']
})
export class AtualizarClienteComponent implements OnInit {
  formClientes: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
   
  });

 
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AtualizarClienteComponent>,
    private snackbar: MatSnackBar, 
    private clienteService: ClientesService
  ) {}
 

  ngOnInit(): void {
    this.formClientes.setValue({
      nome: this.data.nome,
      email: this.data.email,
    })
  }
  atualizarCliente(){
    Object.assign(this.data, this.formClientes.value)
    this.clienteService.atualizarCliente(this.data).subscribe(()=>{
      this.dialogRef.close()
    })
  }

}