import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth/services/auth.service';
import { DialogEditarCargoComponent } from './components/dialog-editar-cargo/dialog-editar-cargo.component';
import { DialogExcluirCargoComponent } from './components/dialog-excluir-cargo/dialog-excluir-cargo.component';
import { Cargos } from './interface/cargos';
import { CargosServiceService } from './service/cargos-service.service';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css'],
})
export class CargosComponent implements OnInit {
  
  offices!: Cargos[];
  dataSource = new MatTableDataSource<Cargos>();
  displayedColumns: string[] = [
    'id',
    'office',
    'description',
    'salary',
    'edit',
    'delete',
  ];
  office!: Cargos;
  formOffice: FormGroup = this.fb.group({
    idCargo:[''],
    nome: ['', [Validators.required, Validators.maxLength(20)]],
    descricao: ['', [Validators.required, Validators.maxLength(60)]],
    salario: ['', [Validators.required]],
  });

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private cargosService: CargosServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargosService.update$.subscribe(()=> {
      this.getAllOffices()
    })
  }

  /* Filtro da tabela */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
  }


  getAllOffices() {
    this.cargosService.getAllOffices().subscribe((newValues) => {
     this.dataSource = new MatTableDataSource(newValues)
      this.offices = newValues;
      console.log(newValues);
    });
  }

  deleteOfficeById(id: number) {
    this.cargosService.deleteOfficeById(id).subscribe(() => {
      this.cargosService.getAllOffices().subscribe((updatedTable) => {
        this.snackBar.open("Cargo excluído!","Ok",{
          verticalPosition:"top",
          duration:5000
        })
        this.offices = updatedTable
      });
    });
  }

  registerOffice() {
    const office: Cargos = this.formOffice.value;
    this.cargosService.registerOffice(office).subscribe(() => {
      this.cargosService.getAllOffices().subscribe((newValues) => {
        this.offices = newValues;
      });
    });
    this.snackBar.open('Cargo cadastrado com sucesso!', 'Ok', {
      verticalPosition: 'top',
      duration: 5000,
    });
    this.formOffice.reset();
  }

  openDialogDelete(id: number) {
    const ref = this.dialog.open(DialogExcluirCargoComponent);

    ref.afterClosed().subscribe((boolean) => {
      if (boolean) {
        this.cargosService.deleteOfficeById(id).subscribe(() => {
          this.cargosService.getAllOffices().subscribe((newValues) => {
            this.offices = newValues;
          });
        });
        this.snackBar.open('Cargo excluído!', 'Ok', {
          verticalPosition: 'top',
          duration: 5000,
        });
      }
    });
  }

  openDialogEdit(id:number) {
    let ref = this.dialog.open(DialogEditarCargoComponent);
    
     this.cargosService.getOfficeById(id).subscribe((newValues) => {
      ref.componentInstance.formOffice.setValue({
        idCargo:newValues.idCargo,
        nome: newValues.nome,
        descricao: newValues.descricao,
        salario: newValues.salario,
      });
    });

     ref.afterClosed().subscribe((boolean) => {
      console.log(boolean);
      if(boolean){
        const updatedOffice = ref.componentInstance.formOffice.value
        this.cargosService.updateOffice(updatedOffice).subscribe((a)=> {
          this.cargosService.getAllOffices().subscribe()
        })
      }
      
    })
  }
}
