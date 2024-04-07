'use client'
import React,{FC, PropsWithChildren, useContext, useReducer} from 'react';
import { CommentActionState, CommentState, ICommentState, ICommentionActionState } from './context';
import { reducer } from './reducer';
import instance from '..';
import { CommentAction, GetComments } from './action';
import { CommentData } from '../../../models/interface';
import useAxios from '..';

const CommentProvider:React.FC<PropsWithChildren>=({children})=>{
    const [state,dispatch]=useReducer(reducer,{});
    const {instance}=useAxios();
    const createComment=async(payload:CommentData,id:string)=>{
        await instance.post(`services/app/Comment/Create/${id}`,payload).then(response=>{
            getComments(id);
        })
    }
    const getComments=async (id:string)=>{
        await instance.get(`services/app/Comment/GetAll/${id}`).then(response=>{
           dispatch(GetComments(response.data.result));
    }).catch(err=>console.log(err))
}
    return(
        <CommentState.Provider value={{...state}}>
            <CommentActionState.Provider value={{getComments,createComment}}>
                {children}
            </CommentActionState.Provider>
        </CommentState.Provider>
    );
}

export default CommentProvider;
export const useCommentState= ():ICommentState=>{
const context = useContext(CommentState);
if(context==undefined){
    throw new Error("Cannot use Search provider")
}
return context;
} 

export const useCommentAction = ():ICommentionActionState=>{
const context = useContext(CommentActionState);
if(context==undefined){
    throw new Error("Cannot use Search")
}
return context;
} 