import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authservice/auth.service';
import { UserService } from '../services/user-service/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  user:User = new User();
  thisUser:User = new User();
  errors:string[] = [];
  selectedImage:File | any = null;

  constructor(private login:AuthService, private userService:UserService, private router:Router){}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.login.currentUser().subscribe((user:any) => {
      this.login.setUser(user);
      this.user = user;
    })
  }

  updateUser(){
    this.thisUser.id = this.user.id;
    this.thisUser.username = this.user.username;
    this.thisUser.firstname = this.user.firstname;
    this.thisUser.lastname = this.user.lastname;
    this.thisUser.email = this.user.email;
    this.thisUser.password = this.user.password;

    if(this.login.isLoggedIn()){
      this.userService.update(this.thisUser).subscribe({
        next: (json) => {
          Swal.fire("Perfil actualizado.");
          this.router.navigate(['/perfil']);
        },
        error: (err) => {
          this.errors = err.error.errors as string[];
        }
      })
    }
  }

  selectImage(event:any){
    this.selectedImage = event.target.files[0];
    if(this.selectedImage.type.indexOf('image') < 0){
      Swal.fire("Error: ", "La imagen debe ser jpg o png", "error");
      this.selectedImage = null;
    }
  }

  uploadImage(){
    if(!this.selectedImage){
      Swal.fire("Error", "Debe seleccionar una imagen", "error")
    }else{
      this.userService.uploadimage(this.selectedImage, this.user.id).subscribe(user => {
        window.location.reload();
        this.getCurrentUser();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Foto de perfil actualizada.",
          showConfirmButton: false,
          timer: 2000
        });
      })
    }
  }
}
