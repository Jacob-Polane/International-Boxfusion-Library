import { handleActions } from "redux-actions";
import { IBookStateContext, INITIAL_STATE } from "./context";
import { searchActionEnum } from "./action";

export const reducer = handleActions({
    [searchActionEnum.SEARCH_BOOK_ACTION]:(state:IBookStateContext,action:ReduxActions.Action<IBookStateContext>)=>(action.payload),
    [searchActionEnum.CLEAR_BOOK_ACTION]:(state:IBookStateContext,action:ReduxActions.Action<IBookStateContext>)=>(action.payload),
    [searchActionEnum.GET_BOOK_ACTION]:(state:IBookStateContext,action:ReduxActions.Action<IBookStateContext>)=>({...action.payload})
},INITIAL_STATE)