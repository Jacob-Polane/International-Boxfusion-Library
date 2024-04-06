export interface IBook{
    id:string,
    title:string,
    author:string,
    isbn10?:string,
    isbn13?:string,
    publisher?:string,
    publishedDate?:string,
    frequency?:number,
    category:string,
    number_Avaiable?:number;
    status?:number;
    oid?:string;
    imageUrl?:string;
    description?:string;
}
export interface IQuery{
    isbn?:string,
    author?:string,
    Category?:string,
    title?:string
}

export interface IUser {
    id?: string;
    username: string;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    password: string;
    gender:number;
  }
  

export interface ILogin{
    userNameOrEmailAddress: string,
    password: string,
    remember:boolean,
    isLibrarian:boolean
}

export interface CommentData{
    message?:string;
    rating?:number;
}

