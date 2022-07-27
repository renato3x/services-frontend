import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  emailUsuario!: string;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.emailUsuario = this.emailLogado()
  }

  emailLogado():string {
    const email = this.authService.emailLogado().sub
    return email
  }
  
  logout() {
    this.authService.signOut()
  }
}