import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { PymeService } from 'src/app/services/pyme-service/pyme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{

  user:User = new User();

  constructor(private auth:AuthService, private pymeService: PymeService, private router:Router, private messageService: MessagesService){}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.auth.currentUser().subscribe((user:any) => {
      this.auth.setUser(user);
      this.user = user;
    })
  }
  deleteMessage(message_id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar el mensaje?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.messageService.deleteMessage(message_id).subscribe(dato => {
          window.location.reload();
        })
      }
    })
  }
}
