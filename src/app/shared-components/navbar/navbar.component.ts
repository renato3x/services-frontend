import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Output, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConfirmarLogoutComponent } from '../confirmar-logout/confirmar-logout.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  emailUser!: string;
  data = this.tempoToken();
  @Input()
  titulo!: string;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService, private dialog: MatDialog,) {
    this.mobileQuery = media.matchMedia('(max-width: 1200px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.emailUser = this.emailUsuario()
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  tempoToken() {
    return this.authService.tempoApp()
  }

  emailUsuario(): string {
    const email = this.authService.emailUsuario().sub
    return email

  }
  logout() {
    const dialog = this.dialog.open(ConfirmarLogoutComponent)
    dialog.afterClosed().subscribe((Response) => {
      if (Response) {
        this.authService.signOut()
      }
    })
  }
}
