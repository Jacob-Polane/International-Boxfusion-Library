export interface IBook{
    id:string,
    title:string,
    author:string,
    isbn10?:string,
    isbn13?:string,
    publisher?:string,
    publishedDate:string,
    frequency:number,
    category:string,
    number_Avaiable:number
}
export interface IQuery{
    isbn?:string,
    author?:string,
    Category?:string,
    title?:string
}

export interface IUser {
    id?: string;
    userName: string;
    name: string;
    surname: string;
    phoneNumber: string;
    emailAddress: string;
    password: string;
    gender:number;
  }
  

export interface ILogin{
    userNameOrEmailAddress: string,
    password: string,
    remember:boolean
}