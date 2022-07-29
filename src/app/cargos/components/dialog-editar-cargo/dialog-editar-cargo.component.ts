import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Cargos } from '../../interface/cargos';
import { CargosServiceService } from '../../service/cargos-service.service';

@Component({
  selector: 'app-dialog-editar-cargo',
  templateUrl: './dialog-editar-cargo.component.html',
  styleUrls: ['./dialog-editar-cargo.component.css'],
})
export class DialogEditarCargoComponent implements OnInit {
  formOffice: FormGroup = this.fb.group({
    idCargo:[''],
    nome: ['', [Validators.required, Validators.maxLength(20)]],
    descricao: ['', [Validators.required, Validators.maxLength(60)]],
    salario: ['', [Validators.required]],
  });

  office!: Cargos;
  disabledButton: boolean = true;

  constructor(
    private fb: FormBuilder,
    private cargosService: CargosServiceService,
    private title:Title
  ) {}

  ngOnInit(): void {
    this.disabledButtonFunction()
    this.title.setTitle("Editar Cargo")
  }

  disabledButtonFunction() {
    this.formOffice.valueChanges.subscribe((valuesChanges) => { // Observa se há a tualização nos valores
      this.cargosService.getOfficeById(valuesChanges.idCargo) // Pega os mesmos valores de quando abre o dialog
      .subscribe((valuesOfGetOfficeById) => {
        this.disabledButton =
         this.formOffice.invalid ||
         !(valuesChanges.nome != valuesOfGetOfficeById.nome ||
           valuesChanges.descricao != valuesOfGetOfficeById.descricao ||
           valuesChanges.salario != valuesOfGetOfficeById.salario)
      })  
    });
  }
}
