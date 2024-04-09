import {createContext} from 'react';
import { ICommentData } from '../../../models/interface';


export interface ICommentState{
    comments?:ICommentData[]
}

export interface ICommentionActionState{
    getComments?:(id:string)=>void;
    createComment?:(payload:ICommentData,id:string)=>void;
    clearComments?:()=>void;
}

export const CommentState=createContext<ICommentState>({});
export const CommentActionState=createContext<ICommentionActionState>(undefined);