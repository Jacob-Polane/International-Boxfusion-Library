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
    id: string;
    Username: string;
    Name: string;
    Surname: string;
    PhoneNumber: string;
    EmailAddress: string;
    Password: string;
  }
  

export interface ILogin{
    userNameOrEmailAddress: string,
    password: string,
    remember:boolean
}