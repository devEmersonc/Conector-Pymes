import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InicioComponent } from './inicio/inicio.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { BannerComponent } from './inicio/banner/banner.component';
import { ContenidoComponent } from './inicio/contenido/contenido.component';
import { PymesComponent } from './pymes/pymes.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor';
import { PerfilComponent } from './perfil/perfil.component';
import { SidenavComponent } from './perfil/sidenav/sidenav.component';
import { MessagesComponent } from './perfil/messages/messages.component';
import { UserPymesComponent } from './perfil/user-pymes/user-pymes.component';
import { CreatePymeComponent } from './perfil/create-pyme/create-pyme.component';
import { PymeComponent } from './perfil/pyme/pyme.component';
import { CommentsComponent } from './comments/comments.component';
import { PymeMessageComponent } from './pyme-message/pyme-message.component';
import { ViewMessageComponent } from './perfil/view-message/view-message.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    NosotrosComponent,
    BannerComponent,
    ContenidoComponent,
    PymesComponent,
    RegistroComponent,
    LoginComponent,
    FooterComponent,
    PerfilComponent,
    SidenavComponent,
    MessagesComponent,
    UserPymesComponent,
    CreatePymeComponent,
    PymeComponent,
    CommentsComponent,
    PymeMessageComponent,
    ViewMessageComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
