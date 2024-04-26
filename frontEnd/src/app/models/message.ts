import { User } from "./user";

export class Message{
    id:number;
    message:string;
    user:User = new User();
}