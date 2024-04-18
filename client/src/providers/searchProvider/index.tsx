'use client'
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useContext, useReducer } from 'react';
import instance from '..';
import { IQuery } from '../../../models/interface';
import { clearBooks, getBooks, getRecommendationAction, getTrendingBooksAction, searchBooks } from './action';
import { IBookActionContext, IBookStateContext, INITIAL_STATE, searchActionContext, searchStateContext } from './context';
import { reducer } from './reducer';


const SearchProvider:FC<PropsWithChildren> =({children})=>{
    const {push} =useRouter();
    const [state,dispatch]=useReducer(reducer,INITIAL_STATE);
    const getState =()=>({...state})

    const trendingBooks=async ()=>{
        await instance.get('services/app/Book/GetTop10').then((response)=>dispatch(getTrendingBooksAction(response.data.result))).catch(err=>message.error('Result failed to load'));
    }
    const searchBook = async (payload:IQuery) =>{
        
        const query=new URLSearchParams({...payload})
        await instance.get(`services/app/Book/SearchBooks?${query?.toString()}`).
                                                                            then(async (response)=>
                                                                                {
                                                                                    
                                                                                  dispatch(searchBooks(response.data.result));
                                                                                  history.pushState({}, '', location.pathname + '?'+query.toString())
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
        console.log(index,"book id")
        console.log(state.trending,"trending")
        if(state.trending){
            var item=state.trending.filter(data=>data.id==index);
            dispatch(getBooks(item[0]));
        }
    }

    const getRecommended=async()=>{
        await instance.get('services/app/Book/GetRecommendation').then((response)=>dispatch(getRecommendationAction(response.data.result))).catch(err=>message.error('Result failed to load'));
        
    }

    const getRecommendedIntial=async(token:string)=>{
        
        await instance.get('services/app/Book/GetRecommendation',{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }}
        ).then((response)=>dispatch(getRecommendationAction(response.data.result))).catch(()=>message.error('Result failed to load'));
      
    }
    return (
        <>
        <searchStateContext.Provider value={getState()}>
            <searchActionContext.Provider value={{searchBook,clearBook,getBook,getBookTrending,trendingBooks,getRecommended,getRecommendedIntial}}>
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