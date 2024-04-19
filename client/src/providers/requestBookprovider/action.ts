import { createAction } from "redux-actions";
import { IRequest, IRequestStateContext } from "./context";
import { IBook } from "../../../models/interface";

export enum RequestEnum{
    REQUEST_BOOK_ACTION="REQUEST_BOOK",
    VIEW_HISTORY_ACTION="VIEW_HISTORY",
    VIEW_REQUESTED_BOOKS="REQUESTED_BOOKS",
<<<<<<< HEAD
    DELETE_BOOK_ACTION="DELETE_BOOK",
    UPDATE_BOOK_ACTION="UPDATE_BOOK"
=======
    CLEAR_REQUESTED_ACTION="REQUEST_BOOKS"
>>>>>>> c5ea7cbf416650cbef8c5e50d0393d7faf8e88e8
};

export const requestBookAction=createAction<IRequestStateContext,IRequest>(RequestEnum.REQUEST_BOOK_ACTION,(request)=>({request}));
export const viewBookAction=createAction<IRequestStateContext,IBook[]>(RequestEnum.REQUEST_BOOK_ACTION,(history)=>({history}));
<<<<<<< HEAD
export const deleteStateAction=createAction<IRequestStateContext,IBook[]>(RequestEnum.DELETE_BOOK_ACTION,(books)=>({books}));
export const updateAction=createAction<IRequestStateContext,IBook[]>(RequestEnum.DELETE_BOOK_ACTION,(books)=>({books}));
export const viewRequestedBooksAction=createAction<IRequestStateContext,IBook[]>(RequestEnum.REQUEST_BOOK_ACTION,(booksRequested)=>({booksRequested}));
=======
export const viewRequestedBooksAction=createAction<IRequestStateContext,IBook[]>(RequestEnum.REQUEST_BOOK_ACTION,(booksRequested)=>({booksRequested}));
export const clearRequestAction=createAction<IRequestStateContext>(RequestEnum.CLEAR_REQUESTED_ACTION)
>>>>>>> c5ea7cbf416650cbef8c5e50d0393d7faf8e88e8
