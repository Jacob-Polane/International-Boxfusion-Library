import { createAction } from "redux-actions";
import {IBookStateContext } from "./context";
import { IBook } from "../../../models/interface";

export const searchActionEnum={
    SEARCH_BOOK_ACTION:'SEARCH_BOOK',
    CLEAR_BOOK_ACTION:'CLEAR_BOOK',
    GET_BOOK_ACTION:'GET_BOOK',
    GET_TRENDING_ACTION:'GET_TRENDING',
    GET_RECOMMENDATION_ACTION:'GET_RECOMMENDATION'
}

export const searchBooks=createAction<IBookStateContext,IBook[]>(searchActionEnum.SEARCH_BOOK_ACTION,(books)=>({books}));
export const clearBooks=createAction<IBookStateContext>(searchActionEnum.CLEAR_BOOK_ACTION,()=>({}));
export const getBooks =createAction<IBookStateContext,IBook>(searchActionEnum.GET_BOOK_ACTION,(book)=>({book}));
export const getTrendingBooksAction=createAction<IBookStateContext,IBook[]>(searchActionEnum.GET_TRENDING_ACTION,(trending)=>({trending}));
export const getRecommendationAction=createAction<IBookStateContext,IBook[]>(searchActionEnum.GET_RECOMMENDATION_ACTION,(Recommendations)=>({Recommendations}));