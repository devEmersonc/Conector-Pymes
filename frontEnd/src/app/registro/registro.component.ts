import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{

  user:User = new User();
  errors:string[];

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {
    
  }

  registerNewUser(){
    this.userService.register(this.user).subscribe({
      next: (JSON) => {
        this.router.navigate(['/login']);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registro exitoso",
          showConfirmButton: false,
          timer: 3000
        });
      },
      error : (err) => {
        this.errors = err.error.errors as string[];
      }
    })
  }
}
