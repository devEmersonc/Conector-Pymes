import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authservice/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private login:AuthService, private router:Router){}

  ngOnInit(): void {
    
  }

  isLoggined(){
    if(this.login.isLoggedIn()){
      return true;
    }else{
      return false;
    }
  }

  logOut(){
    this.login.logOut();
    this.router.navigate(['/']);    
  }
}
