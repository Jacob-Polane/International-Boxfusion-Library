import { createAction } from "redux-actions";
import { ICommentState } from "./context";
import { ICommentData } from "../../../models/interface";

export enum CommentAction{
    getComments='GET_COMMENTS',
    clearComment="CLEAR"
} 

export const GetComments=createAction<ICommentState,ICommentData[]>(CommentAction.getComments,(comments)=>({comments}))
export const ClearComment=createAction<ICommentState>(CommentAction.clearComment)