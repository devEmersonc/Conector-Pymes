import { Pyme } from "./pyme";

export class User{
    id:number;
    username:string;
    firstname:string;
    lastname:string;
    email:string;
    password:string;
    photo:string;
    createdAt:string;
    pymes:Pyme[] = [];
}