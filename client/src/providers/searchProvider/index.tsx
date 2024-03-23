'use client'
import { message } from 'antd';
import React,{FC, PropsWithChildren, useContext, useReducer, useState} from 'react';
import {searchBooks,clearBooks,getBooks} from './action';
import { reducer } from './reducer';
import { useGet, useMutate } from 'restful-react';
import { INITIAL_STATE,searchStateContext,searchActionContext, IBookStateContext, IBookActionContext} from './context';
import { IQuery } from '../../../models/interface';

const SearchProvider:FC<PropsWithChildren> =({children})=>{
    const [state,dispatch]=useReducer(reducer,INITIAL_STATE);
    const getState =()=>({...state})

    const searchBook = async (payload:IQuery) =>{
        const query=new URLSearchParams({...payload})
        const token = localStorage.getItem("token");

        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}services/app/Book/search?${query?.toString()}`, {
            method: 'GET',
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            },
          }).then(async (res)=>{
            const response=await res.json();
            dispatch(searchBooks(response.result));
            message.success('Added to cart');
          }).catch(err=>message.error('Failed to add to cart'));             
    }

    const clearBook=async ()=>{
        dispatch(clearBooks());
    }

    const getBook=(index:string)=>{
        if(state.books){
            var item=state.books.filter(data=>data.id==index);
            dispatch(getBooks(item[0]));
        }
    }
    return (
        <>
        <searchStateContext.Provider value={getState()}>
            <searchActionContext.Provider value={{searchBook,clearBook,getBook}}>
                {children}
            </searchActionContext.Provider>
        </searchStateContext.Provider>
        </>
    );
}

export default SearchProvider;

export const useSearchStateContext= ():IBookStateContext=>{
    const context = useContext(searchStateContext);
    if(context==undefined){
        throw new Error("Cannot use Search provider")
    }
    return context;
} 

export const useSearchActionContext = ():IBookActionContext=>{
    const context = useContext(searchActionContext);
    if(context==undefined){
        throw new Error("Cannot use Search")
    }
    return context;
} 