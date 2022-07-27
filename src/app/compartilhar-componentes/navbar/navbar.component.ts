import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private dialog:MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  openDialogConfirmExit() {
   const ref = this.dialog.open(LogoutDialogComponent)
  
   ref.afterClosed().subscribe((boolean) => {
    if(boolean) {
      this.authService.signOut()
    }
   })
  }
}
