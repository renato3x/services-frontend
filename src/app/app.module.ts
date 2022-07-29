import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat/'
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { InterceptorInterceptor } from './interceptor/interceptor.interceptor';
import { CompartilharComponentesModule } from './compartilhar-componentes/compartilhar-componentes.module';
import { ClienteComponent } from './clientes/pages/cliente/cliente.component';
import { FormClienteComponent } from './clientes/componentes/form-cliente/form-cliente.component';
import { DeletarClienteComponent } from './clientes/componentes/deletar-cliente/deletar-cliente.component';
import { EditarClienteComponent } from './clientes/componentes/editar-cliente/editar-cliente.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey
      } as RecaptchaSettings
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
