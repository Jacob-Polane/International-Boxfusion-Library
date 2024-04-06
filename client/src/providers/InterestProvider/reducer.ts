import { handleActions } from "redux-actions";
import { InterestActions } from "./action";
import { IInterestState } from "./context";

export const reducer=handleActions({
    [InterestActions.GetInterest]:(State:IInterestState,action:ReduxActions.Action<IInterestState>)=>({...action.payload})
},{});