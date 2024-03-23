import { createAction } from "redux-actions";
import {IBookStateContext } from "./context";
import { IBook } from "../../../models/interface";

export const searchActionEnum={
    SEARCH_BOOK_ACTION:'SEARCH_BOOK',
    CLEAR_BOOK_ACTION:'CLEAR_BOOK',
    GET_BOOK_ACTION:'GET_BOOK'
}

export const searchBooks=createAction<IBookStateContext,IBook[]>(searchActionEnum.SEARCH_BOOK_ACTION,(books)=>({books}));
export const clearBooks=createAction<IBookStateContext>(searchActionEnum.CLEAR_BOOK_ACTION,()=>({}))
export const getBooks =createAction<IBookStateContext,IBook>(searchActionEnum.GET_BOOK_ACTION,(book)=>({book}))