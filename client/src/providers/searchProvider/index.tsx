'use client'
import { message } from 'antd';
import React,{FC, PropsWithChildren, useContext, useReducer, useState} from 'react';
import {searchBooks,clearBooks,getBooks, getTrendingBooksAction, getRecommendationAction} from './action';
import { reducer } from './reducer';
import { useGet, useMutate } from 'restful-react';
import { INITIAL_STATE,searchStateContext,searchActionContext, IBookStateContext, IBookActionContext} from './context';
import { IQuery } from '../../../models/interface';
import useAxios from '..';


const SearchProvider:FC<PropsWithChildren> =({children})=>{
    const [state,dispatch]=useReducer(reducer,INITIAL_STATE);
    const getState =()=>({...state})
    const {instance}=useAxios();
    const trendingBooks=async ()=>{
        await instance.get('services/app/Book/GetTop10').then((response)=>dispatch(getTrendingBooksAction(response.data.result))).catch(err=>message.error('Result failed to load'));
    }
    const searchBook = async (payload:IQuery) =>{
        const query=new URLSearchParams({...payload})
        await instance.get(`services/app/Book/search?${query?.toString()}`).
                                                                            then(async (response)=>
                                                                                {
                                                                                  dispatch(searchBooks(response.data.result));
                                                                                  message.success('Results laoding');
                                                                                }).catch(err=>message.error('Result failed to load'));             
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

    const getBookTrending=(index:string)=>{
        if(state.trending){
            var item=state.trending.filter(data=>data.id==index);
            dispatch(getBooks(item[0]));
        }
    }

    const getRecommended=async()=>{
        await instance.get('services/app/Book/GetRecommendation').then((response)=>dispatch(getRecommendationAction(response.data.result))).catch(err=>message.error('Result failed to load'));
        
    }
    return (
        <>
        <searchStateContext.Provider value={getState()}>
            <searchActionContext.Provider value={{searchBook,clearBook,getBook,getBookTrending,trendingBooks,getRecommended}}>
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