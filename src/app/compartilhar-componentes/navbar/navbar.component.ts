import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Funcionario } from 'src/app/funcionarios/models/funcionario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  funcionario: Funcionario[] = []

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  
}
