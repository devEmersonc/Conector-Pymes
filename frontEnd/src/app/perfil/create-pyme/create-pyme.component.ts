import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pyme } from 'src/app/models/pyme';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { PymeService } from 'src/app/services/pyme-service/pyme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-pyme',
  templateUrl: './create-pyme.component.html',
  styleUrls: ['./create-pyme.component.css']
})
export class CreatePymeComponent implements OnInit{

  pyme:Pyme = new Pyme();
  user:User = new User();
  errors:string[];
  selectedImage:File | any = null;

  constructor(private auth:AuthService, private pymeService: PymeService, private router:Router){}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.auth.currentUser().subscribe((user:any) => {
      this.auth.setUser(user);
      this.user = user;
    })
  }

  createPyme(){
    this.pymeService.createPyme(this.pyme, this.user).subscribe({
      next: (json) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Creado con éxito.",
          showConfirmButton: false,
          timer: 2500
        });
        this.router.navigate(['/tus-pymes'])        
      },
      error: (err) => {
        this.errors = err.error.errors as string[];
      }
    })
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
      this.pymeService.uploadImage(this.selectedImage, this.user.id).subscribe(user => {
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
