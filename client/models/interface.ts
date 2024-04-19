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
    imageUrl?:any;
    imageString:string;
    fileData:any;
    description?:string;
}

export interface IQuery{
    searchTerm:string
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

export interface ICommentData{
    message?:string;
    rating?:number;
}

// Create a file named localStorage.d.ts in your project

export interface ILocalStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
  }
  
  export interface IWindow{
    localStorage?:ILocalStorage
  }
