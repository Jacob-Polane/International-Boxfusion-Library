import { handleActions } from "redux-actions";
import { RequestEnum } from "./action";
import { IRequestStateContext } from "./context";

export const reducer=handleActions({
    [RequestEnum.REQUEST_BOOK_ACTION]:(State:IRequestStateContext,action:ReduxActions.Action<IRequestStateContext>)=>({...State,...action.payload}),
    [RequestEnum.VIEW_HISTORY_ACTION]:(State:IRequestStateContext,action:ReduxActions.Action<IRequestStateContext>)=>({...State,...action.payload}),
},{})