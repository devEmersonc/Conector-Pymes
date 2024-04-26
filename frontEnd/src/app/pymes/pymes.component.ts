import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authservice/auth.service';
import { PymeService } from '../services/pyme-service/pyme.service';
import { Pyme } from '../models/pyme';

@Component({
  selector: 'app-pymes',
  templateUrl: './pymes.component.html',
  styleUrls: ['./pymes.component.css']
})
export class PymesComponent implements OnInit{

  pymes:Pyme[] = [];

  constructor(private auth:AuthService, private pymeService: PymeService){}

  ngOnInit(): void {
    this.getPymes();
  }

  getPymes(){
    this.pymeService.getAllPymes().subscribe((pymes) => {
      this.pymes = pymes;
    })
  }
}
