import {createContext} from 'react';
import { CommentData } from '../../../models/interface';


export interface ICommentState{
    comments?:CommentData[]
}

export interface ICommentionActionState{
    getComments?:(id:string)=>void;
    createComment?:(payload:CommentData,id:string)=>void;
}

export const CommentState=createContext<ICommentState>({});
export const CommentActionState=createContext<ICommentionActionState>({});