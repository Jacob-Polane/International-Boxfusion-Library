import { handleActions } from "redux-actions";
import { CommentAction } from "./action";
import { ICommentState } from "./context";

export const reducer = handleActions({
    [CommentAction.getComments]:(State:ICommentState,action:ReduxActions.Action<ICommentState>)=>({...action.payload}),
    [CommentAction.clearComment]:(State:ICommentState,action:ReduxActions.Action<ICommentState>)=>({...action.payload})
},{})