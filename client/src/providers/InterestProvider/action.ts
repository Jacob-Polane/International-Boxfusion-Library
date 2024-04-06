import { createAction } from "redux-actions";
import { IInterestState } from "./context";

export enum InterestActions{
        GetInterest="GET_INTEREST",
        SaveInterests="SAVE_INTEREST"
} 

export const getInterestAction=createAction<IInterestState,string[]>(InterestActions.GetInterest,(Interests)=>({Interests}))
export const saveInterestsAction=createAction<IInterestState>(InterestActions.SaveInterests);