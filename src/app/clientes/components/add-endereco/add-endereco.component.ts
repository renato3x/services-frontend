import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnderecoService } from 'src/app/enderecos/services/endereco.service';

@Component({
  selector: 'app-add-endereco',
  templateUrl: './add-endereco.component.html',
  styleUrls: ['./add-endereco.component.css']
})
export class AddEnderecoComponent implements OnInit {

  idCliente!: number
  salvandoEndereco: boolean = false

  formEndereco: FormGroup = this.fb.group({
    rua: ['', [Validators.required]],
    bairro: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    uf: ['', [Validators.required, Validators.maxLength(2)]]
  })

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEnderecoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private enderecoService: EnderecoService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.idCliente = this.data
  }

  salvar() {
    this.salvandoEndereco = true
    this.enderecoService.salvarEndereco(this.formEndereco.value, this.idCliente).subscribe(
      () => {
        this.snackbar.open('Endereço salvo com sucesso', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close()
      }
    )
  }

}
