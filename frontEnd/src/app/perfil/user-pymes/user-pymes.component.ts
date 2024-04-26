import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/authservice/auth.service';

@Component({
  selector: 'app-user-pymes',
  templateUrl: './user-pymes.component.html',
  styleUrls: ['./user-pymes.component.css']
})
export class UserPymesComponent implements OnInit{

  user:User = new User();

  constructor(private auth:AuthService, private router:Router){}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.auth.currentUser().subscribe((user:any) => {
      this.auth.setUser(user);
      this.user = user;
    })
  }

  redirect(id:number){
    this.router.navigate(['/pyme/', id]);
  }
}
