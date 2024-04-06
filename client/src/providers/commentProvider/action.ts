import { createAction } from "redux-actions";
import { ICommentState } from "./context";
import { CommentData } from "../../../models/interface";

export enum CommentAction{
    getComments='GET_COMMENTS'
} 

export const GetComments=createAction<ICommentState,CommentData[]>(CommentAction.getComments,(comments)=>({comments}))