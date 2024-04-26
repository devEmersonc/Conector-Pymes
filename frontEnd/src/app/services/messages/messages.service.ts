import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Message } from 'src/app/models/message';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private baseUrl = "http://localhost:8080/api/messages"
  

  constructor(private http:HttpClient) { }

  getMessage(id:number): Observable<Message>{
    return this.http.get<Message>(`${this.baseUrl}/message/${id}`);
  }

  saveMessage(message:Message, user_id:number, pyme_id:number): Observable<Message>{
    return this.http.post<Message>(`${this.baseUrl}/create/message/${user_id}/${pyme_id}`, message).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(() => e);
        }
      
        Swal.fire(e.error.message, e.error.error, "error");
        return throwError(() => e);
      })
    )
  }

  deleteMessage(id:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
