import { createContext } from 'react';
import { IBook } from '../../../models/interface';


export interface IRequest{
    bookId:string;
    borrowerId?:string;
    status:number;
    id?:string;
}
export const INITIAL_STATE: IRequestStateContext={}

export interface IRequestStateContext {
    readonly request?:IRequest;
    readonly history?:IBook[];
    readonly booksRequested?:IBook[];
    readonly books?:IBook[];
}

export interface UpdateStatus{
    id?:string;
    status?:number;
}

export interface IRequestActionContext{
    requestBook?:(payload:IRequest)=>void;
    viewHistory?:()=>void; 
    viewAllRequest?:(status:string)=>void;
    changeBookState?:(status:UpdateStatus)=>void;
    createBook?:(payload:IBook)=>void;
<<<<<<< HEAD
    update?:(payload:IBook)=>void;
    deleteBook?:(id:string)=>void;
=======
    clearRequest?:()=>void;
>>>>>>> c5ea7cbf416650cbef8c5e50d0393d7faf8e88e8
}

const RequestContext = createContext<IRequestStateContext>(INITIAL_STATE);

const RequestActionContext = createContext<IRequestActionContext>({});

export {RequestActionContext,RequestContext};