import { createAction } from "redux-actions";
import { ICommentState } from "./context";
import { ICommentData } from "../../../models/interface";

export enum CommentAction{
    getComments='GET_COMMENTS'
} 

export const GetComments=createAction<ICommentState,ICommentData[]>(CommentAction.getComments,(comments)=>({comments}))