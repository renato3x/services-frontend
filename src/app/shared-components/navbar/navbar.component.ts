import { Component, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConfirmarLogoutComponent } from '../confirmar-logout/confirmar-logout.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  emailUser!: string;

  constructor(
    private dialog: MatDialog,
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
    const dialog= this.dialog.open(ConfirmarLogoutComponent)
    dialog.afterClosed().subscribe((Response) => {
      if(Response) {
        this.authService.signOut()
      }
    })
  
  }
  

  }


