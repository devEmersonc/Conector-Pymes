import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pyme } from 'src/app/models/pyme';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { PymeService } from 'src/app/services/pyme-service/pyme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pyme',
  templateUrl: './pyme.component.html',
  styleUrls: ['./pyme.component.css']
})
export class PymeComponent implements OnInit{

  pyme:Pyme = new Pyme();
  id:number = 0;
  errors:string[]
  selectedImage: File | any = null;

  constructor(private auth:AuthService, private router: Router, private pymeService: PymeService, private route:ActivatedRoute){}

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.getPyme();
    }else{
      this.router.navigate(['/']);
    }
  }

  getPyme(){
    this.route.paramMap.subscribe(params => {
      let id:number = Number(params.get('id'));
      if(id){
        this.pymeService.getPyme(id).subscribe(pyme => {
          this.pyme = pyme;
        })
      }
    })
  }

  updatePyme(){
    this.pymeService.updatePyme(this.pyme, this.pyme.id).subscribe({
      next: (json) => {
        Swal.fire("Pyme acualizada");
        window.location.reload();
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
      Swal.fire("Error", "Debe seleccionar una imagen", "error");
    }else{
      this.pymeService.uploadImage(this.selectedImage, this.pyme.id).subscribe(pyme => {
        window.location.reload();
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
