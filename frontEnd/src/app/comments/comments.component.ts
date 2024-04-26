import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authservice/auth.service';
import { PymeService } from '../services/pyme-service/pyme.service';
import { ActivatedRoute } from '@angular/router';
import { Pyme } from '../models/pyme';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { CommentService } from '../services/comments-service/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit{

  comments:Comment = new Comment();
  pyme:Pyme = new Pyme();
  user:User = new User();
  errors:string[];

  constructor(private auth:AuthService, private route:ActivatedRoute, private pymeService: PymeService, private commentService: CommentService){}

  ngOnInit(): void {
    this.getUser();
    this.getPyme();
  }

  isConnected(){
    if(this.auth.isLoggedIn()){      
      return true;
    }else{
      return false;
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

  getUser(){
    if(this.isConnected()){
      this.auth.currentUser().subscribe((user:any) => {
        this.auth.setUser(user);
        this.user = user;
      })
    }else{
      
    }
  }

  createMessage(){
    this.commentService.createComment(this.comments, this.user.id, this.pyme.id).subscribe({
      next: (json) => {
        window.location.reload();
      },
      error: (err) => {
        this.errors = err.error.errors as string[];
      }
    })
  }
}
