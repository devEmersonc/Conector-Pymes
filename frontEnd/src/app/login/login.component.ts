import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authservice/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginData = {
    "username": "",
    "password": ""
  }

  errors:string[] = [];

  constructor(private login: AuthService, private router:Router){}

  ngOnInit(): void {
    
  }

  formlogin(){
    this.login.generateToken(this.loginData).subscribe(
      (data:any) => {
        this.login.loginUser(data.token);
        this.login.currentUser().subscribe((user:any) => {
          this.login.setUser(user);

          if(this.login.getUserRole() == 'ROLE_USER'){
            this.router.navigate(['/']);
          }else{
            this.login.logOut();
          }
        }) 
      },(error) => {
        this.errors = error.error.errors as string[];
      }
    )
  }
}
