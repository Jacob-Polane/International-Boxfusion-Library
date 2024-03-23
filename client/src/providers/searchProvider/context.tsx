import { createContext } from "react";
import { IBook,IQuery } from "../../../models/interface";

export interface IBookStateContext{
    readonly books?:IBook[];
    readonly book?:IBook;
}
export interface IBookActionContext{
    searchBook?:(payload:IQuery)=>void;
    clearBook?:()=>void;
    getBook?:(index:string)=>void;
}
export const INITIAL_STATE:IBookStateContext={};
export const INITIAL_ACTION:IBookActionContext={};

export const searchStateContext = createContext<IBookStateContext>(INITIAL_STATE);
export const searchActionContext = createContext<IBookActionContext>(INITIAL_ACTION);