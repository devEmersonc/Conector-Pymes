import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authservice/auth.service';
import { PymeService } from '../services/pyme-service/pyme.service';
import { Pyme } from '../models/pyme';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { MessagesService } from '../services/messages/messages.service';
import { Message } from '../models/message';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pyme-message',
  templateUrl: './pyme-message.component.html',
  styleUrls: ['./pyme-message.component.css']
})
export class PymeMessageComponent implements OnInit{

  message:Message = new Message();
  pyme:Pyme = new Pyme();
  user:User = new User();
  errors:string[];

  constructor(public auth: AuthService, private pymeService: PymeService, private route: ActivatedRoute, private messageService: MessagesService, private router: Router){}

  ngOnInit(): void {
    this.getPyme();
    this.getUser();
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

  getUser(){
    this.auth.currentUser().subscribe((user:any) => {
      this.auth.setUser(user);
      this.user = user;
    })
  }

  saveMessage(){
    this.messageService.saveMessage(this.message, this.user.id, this.pyme.id).subscribe({
      next: (json) => {
        window.location.reload();        
      },
      error: (err) => {
        this.errors = err.error.errors as string[];
      }
    })
  }

  login(){
    this.router.navigate(['/login']);
  }
  
  registro(){
    this.router.navigate(['/registro']);
  }
}
