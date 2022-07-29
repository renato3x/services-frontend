import { BreakpointObserver, Breakpoints, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConfirmarLogoutComponent } from '../confirmar-logout/confirmar-logout.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  /* isHandset:Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.isHandset) */
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  tempoToken() {
    return this.authService.tempoApp()
  }


  /* 
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
    
    } */


}


