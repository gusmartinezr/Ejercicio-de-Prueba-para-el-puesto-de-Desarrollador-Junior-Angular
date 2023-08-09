export class Response<T>{
    success!:boolean;
    message!:string;
    data!:T;    
    items!: [];
    total!:number;
}
