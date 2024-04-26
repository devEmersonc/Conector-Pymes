import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Pyme } from 'src/app/models/pyme';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PymeService {

  private baseUrl = "http://localhost:8080/api/pyme"

  constructor(private http: HttpClient) { }

  getAllPymes(): Observable<Pyme[]>{
    return this.http.get<Pyme[]>(`${this.baseUrl}/list-pymes`);
  }

  getPyme(id:number): Observable<Pyme>{
    return this.http.get<Pyme>(`${this.baseUrl}/${id}`);
  }

  createPyme(pyme: Pyme, user: User): Observable<Pyme>{
    return this.http.post<Pyme>(`${this.baseUrl}/create/pyme/${user.id}`, pyme).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(() => e);
        }

        Swal.fire(e.error.message, e.error.error, "error");
        return throwError(() => e);
      })
    )
  }

  updatePyme(pyme:Pyme, id:number): Observable<Pyme>{
    return this.http.post<Pyme>(`${this.baseUrl}/update/pyme/${id}`, pyme).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(() => e);
        }

        Swal.fire(e.error.message, e.error.error, "error");
        return throwError(() => e);
      })
    )
  }

  uploadImage(image:File, id:any): Observable<Pyme>{
    let formData = new FormData();
    formData.append("image", image);
    formData.append("id", id);

    return this.http.post(`${this.baseUrl}/upload/image`, formData).pipe(
      map((response: any) => response.pyme as Pyme),
      catchError(e => {
        Swal.fire(e.error.message, e.error.erro, "error");
        return throwError(() => e);
      })
    )
  }
}
