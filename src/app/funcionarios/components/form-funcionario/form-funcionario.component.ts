import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, Observable } from 'rxjs';
import { Cargos } from 'src/app/cargos/interface/cargos';
import { CargosServiceService } from 'src/app/cargos/service/cargos-service.service';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-form-funcionario',
  templateUrl: './form-funcionario.component.html',
  styleUrls: ['./form-funcionario.component.css'],
})
export class FormFuncionarioComponent implements OnInit {
  formFuncionario: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    foto: [''],
    idCargo: ['', [Validators.required]],
  });

  foto!: File;
  fotoPreview: string = '';
  salvandoFuncionario: boolean = false;
  cargos: Cargos[] = [];
  cargo!: Cargos;

  constructor(
    private fb: FormBuilder,
    private funcService: FuncionarioService,
    private dialogRef: MatDialogRef<FormFuncionarioComponent>, // objeto que permite controlar o dialog aberto
    private snackbar: MatSnackBar, // com esse objeto será criado um snackbar na tela
    private cargosService: CargosServiceService
  ) {}

  ngOnInit(): void {
    this.getAllOffices();
  }

  recuperarFoto(event: any): void {
    this.foto = event.target.files[0];
    this.carregarPreview();
  }

  carregarPreview(): void {
    const reader = new FileReader();

    reader.readAsDataURL(this.foto);

    reader.onload = () => {
      this.fotoPreview = reader.result as string;
    };
  }

  salvar(): void {
    this.salvandoFuncionario = true;
    const f: Funcionario = this.formFuncionario.value;
    let obsSalvar: Observable<any>;
    let idCargo = this.formFuncionario.value.idCargo
    console.log(idCargo);
    
    if (this.formFuncionario.value.foto.length > 0) {
      obsSalvar = this.funcService.salvarFuncionario(f,idCargo, this.foto);
    } else {
      obsSalvar = this.funcService.salvarFuncionario(f,idCargo);
    }

    obsSalvar.subscribe((resultado) => {
      // 1° testar se o resultado é uma Promise ou não
      if (resultado instanceof Promise) {
        /**
         * Se cair no if, significa que há uma promise e que tem uma
         * foto para salvar
         */

        // 1° -> Recuperar o observable que me é retornado do primeiro subscribe

        /**
         * a função then() é executada
         * quando a promise consegue te retornar os dados com sucesso
         *
         * nesse caso, o dado que será retorna é um observable com o funcionário
         * que foi salvo no banco de dados
         */
        resultado.then((obs$) => {
          // inscrevendo-se no observable que nos retornará o funcionário salvo no banco de dados
          obs$.subscribe(() => {
            // quando o funcionário for salvo, aparecerá um snackbar na tela e o dialog será fechado
            this.snackbar.open('Funcionário salvo com sucesso', 'Ok', {
              duration: 3000,
            });
            this.dialogRef.close();
          });
        });
      } else {
        /**
         * Se cair no else, significa que o funcionário já foi salvo
         * e não tinha foto para enviar
         */
        this.snackbar.open('Funcionário salvo com sucesso', 'Ok', {
          duration: 3000,
        });
        this.dialogRef.close();
      }
    });
  }

  getAllOffices() {
    this.cargosService.getAllOffices().subscribe((newValues) => {
      this.cargos = newValues;
    });
  }
}
