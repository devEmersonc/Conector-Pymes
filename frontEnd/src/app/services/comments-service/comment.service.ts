import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Comment } from 'src/app/models/comment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = "http://localhost:8080/api/messages"

  constructor(private http:HttpClient) { }

  createComment(comment:Comment, user_id:number, pyme_id:number): Observable<Comment>{
    return this.http.post<Comment>(`${this.baseUrl}/comment/${user_id}/${pyme_id}`, comment).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(() => e);
        }

        Swal.fire(e.error.message, e.error.error, "error");
        return throwError(() => e);
      })
    );
  }
}
