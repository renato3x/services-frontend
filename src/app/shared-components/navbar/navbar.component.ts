import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  emailUser!: string;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.emailUser= this.emailUsuario()
  }

  emailUsuario():string {
    const email= this.authService.emailUsuario().sub
    return email
  }
  logout() {
    this.authService.signOut()
  }
}
