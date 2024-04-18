import { createContext } from "react";
import { IBook,IQuery } from "../../../models/interface";

export interface IBookStateContext{
    books?:IBook[];
    readonly book?:IBook;
    readonly trending?:IBook[];
    readonly Recommendations?:IBook[];
}
export interface IBookActionContext{
    searchBook?:(payload:IQuery)=>void;
    clearBook?:()=>void;
    getBook?:(index:string)=>void;
    trendingBooks?:()=>void;
    getBookTrending?:(index:string)=>void;
    getRecommended?:()=>void;
    getRecommendedIntial?:(token:string)=>void;
}
export const INITIAL_STATE:IBookStateContext={};
export const INITIAL_ACTION:IBookActionContext={};

export const searchStateContext = createContext<IBookStateContext>(INITIAL_STATE);
export const searchActionContext = createContext<IBookActionContext>(INITIAL_ACTION);