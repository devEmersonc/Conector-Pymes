import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { PymesComponent } from './pymes/pymes.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MessagesComponent } from './perfil/messages/messages.component';
import { UserPymesComponent } from './perfil/user-pymes/user-pymes.component';
import { CreatePymeComponent } from './perfil/create-pyme/create-pyme.component';
import { PymeComponent } from './perfil/pyme/pyme.component';
import { CommentsComponent } from './comments/comments.component';
import { PymeMessageComponent } from './pyme-message/pyme-message.component';
import { ViewMessageComponent } from './perfil/view-message/view-message.component';
import { userGuard } from './services/user-service/user.guard';

const routes: Routes = [
  {path:"", component:InicioComponent, pathMatch:'full'},
  {path:"nosotros", component:NosotrosComponent},
  {path:"pymes", component:PymesComponent},
  {path:"registro", component:RegistroComponent},
  {path:"login", component:LoginComponent},
  {path:"perfil", component:PerfilComponent, canActivate: [userGuard]},
  {path:"mensajes", component:MessagesComponent, canActivate: [userGuard]},
  {path:"tus-pymes", component:UserPymesComponent, canActivate: [userGuard]},
  {path:"crear/pyme", component:CreatePymeComponent, canActivate: [userGuard]},
  {path:"pyme/:id", component:PymeComponent},
  {path:"comentarios/:string/:id", component:CommentsComponent},
  {path:"pyme/:id/:string", component:PymeMessageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
