import { Component, OnInit } from '@angular/core';
import { Pyme } from 'src/app/models/pyme';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { PymeService } from 'src/app/services/pyme-service/pyme.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit{

  pymes:Pyme[] = [];
  newPymes:Pyme[] = [];

  constructor(private pymeService:PymeService){}

  ngOnInit(): void {
    this.getAllPymes();
  }

  getAllPymes(){
    this.pymeService.getAllPymes().subscribe((pymes) => {
      this.pymes = pymes;
      for(let i=0; i<this.pymes.length; i++){
        if(this.newPymes.length<6){
          this.newPymes.push(this.pymes[i]);
        }
      }
    })
  }
}
