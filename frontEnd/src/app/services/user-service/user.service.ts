import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:8080/api/users";

  constructor(private http: HttpClient) { }

  register(user:User): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/register`, user).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(() => e);
        }

        Swal.fire(e.error.message, e.error.error, "error");
        return throwError(() => e);
      })
    )
  }

  update(user:User): Observable<User>{
    return this.http.put<User>(`${this.baseUrl}/update/${user.id}`, user).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(() => e);
        }

        Swal.fire(e.error.message, e.error.error, "error");
        return throwError(() => e);
      })
    )
  }

  uploadimage(image: File, id:any): Observable<User>{
    let formData = new FormData();
    formData.append("image", image);
    formData.append("id", id);

    return this.http.post(`${this.baseUrl}/upload/image`, formData).pipe(
      map((response: any) => response.user as User),
      catchError(e => {
        Swal.fire(e.rrror.message, e.error.error, "error");
        return throwError(() => e);
      })
    )
  }
}
