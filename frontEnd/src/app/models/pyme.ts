import { Comment } from "./comment";
import { Message } from "./message";

export class Pyme{
    id:number;
    name:string;
    phone:string;
    photo:string;
    description:string;
    comments:Comment[];
    messages:Message[];
}