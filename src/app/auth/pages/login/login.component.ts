import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    login: ['', [ Validators.required ]],
    password: ['', [ Validators.required ]],
    recaptcha: ['', [ Validators.required ]]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  login(): void {
    const credenciais = { login: this.loginForm.value.login, password: this.loginForm.value.password }
    this.authService.signIn(credenciais)
    .subscribe(
      () => {
        this.snackbar.open('Logado com sucesso', 'Ok', {
          duration: 3000
        })

        this.router.navigateByUrl('/funcionarios')
      }
    )
  } 
}
