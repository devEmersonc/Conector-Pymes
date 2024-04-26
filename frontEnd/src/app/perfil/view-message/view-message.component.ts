import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit{

  message:Message = new Message();

  constructor(private auth:AuthService, private messageService: MessagesService, private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.getMessage();
  }

  getMessage(){
    this.route.paramMap.subscribe(params => {
      let id:number = Number(params.get('id'));
      if(id){
        this.messageService.getMessage(id).subscribe(message => {
          this.message = message;
        })
      }
    })
  }
}
