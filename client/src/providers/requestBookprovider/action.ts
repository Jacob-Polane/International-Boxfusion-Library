import { createAction } from "redux-actions";
import { IRequest, IRequestStateContext } from "./context";
import { IBook } from "../../../models/interface";

export enum RequestEnum{
    REQUEST_BOOK_ACTION="REQUEST_BOOK",
    VIEW_HISTORY_ACTION="VIEW_HISTORY",
    VIEW_REQUESTED_BOOKS="REQUESTED_BOOKS"
};

export const requestBookAction=createAction<IRequestStateContext,IRequest>(RequestEnum.REQUEST_BOOK_ACTION,(request)=>({request}));
export const viewBookAction=createAction<IRequestStateContext,IBook[]>(RequestEnum.REQUEST_BOOK_ACTION,(history)=>({history}));
export const viewRequestedBooksAction=createAction<IRequestStateContext,IBook[]>(RequestEnum.REQUEST_BOOK_ACTION,(booksRequested)=>({booksRequested}));