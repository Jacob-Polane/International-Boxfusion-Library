import { createContext } from "react";

export interface IInterestState{
    Interests?:string[]
}

export interface IInterestAction{
    getInterests?:()=>void;
    saveInterests?:(interests:string[])=>void;
}

export const InterestStateContext=createContext<IInterestState>({});
export const InterestActtionContext=createContext<IInterestAction>({});
