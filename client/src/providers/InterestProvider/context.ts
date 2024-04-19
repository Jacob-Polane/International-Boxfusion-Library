import { createContext } from "react";

export interface IInterestState{
    Interests?:string[]
}

export interface IInterestAction{
    getInterests?:()=>void;
    saveInterests?:(interests:string[])=>void;
<<<<<<< HEAD
    getInterestsIntialise?: (token:string)=>void;
=======
    clearRequest?:()=>void;
>>>>>>> c5ea7cbf416650cbef8c5e50d0393d7faf8e88e8
}

export const InterestStateContext=createContext<IInterestState>({});
export const InterestActtionContext=createContext<IInterestAction>({});
