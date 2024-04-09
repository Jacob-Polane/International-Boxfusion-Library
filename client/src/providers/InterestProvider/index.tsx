'use client'
import React,{FC, PropsWithChildren, useContext, useReducer} from 'react';
import { InterestActtionContext, InterestStateContext } from './context';
import { reducer } from './reducer';
import { clearRequestAction, getInterestAction } from './action';
import { useSearchActionContext } from '../searchProvider';
import useAxios from '..';

const InterestsProvider:FC<PropsWithChildren>=({children})=>{
    const [state,dispath] = useReducer(reducer,{});
    const {instance}=useAxios();
    const {getRecommended}=useSearchActionContext();

    const getInterests= async ()=>{ 
        await instance.get('services/app/Borrower/GetInterests').then(response=>
            {
                dispath(getInterestAction(response.data.result.interestCategory))
            }).catch(error=>console.log(error));

    }

    const saveInterests=async (payload:string[])=>{
        await instance.post('services/app/Borrower/CreateInterest',JSON.stringify({InterestCategory:[...payload]})).then(async()=> {
            await getInterests();
            if(getRecommended)await getRecommended();
        }).then(error=>console.log(error));
    }

    const clearRequest=()=>{
        dispath(clearRequestAction({}))
    }

    return (
        <InterestStateContext.Provider value={{...state}}>
            <InterestActtionContext.Provider value={{getInterests,saveInterests,clearRequest}}>
                {children}
            </InterestActtionContext.Provider>
        </InterestStateContext.Provider>
    );
}

export default InterestsProvider;

export const useInterestState=()=>{
    const context=useContext(InterestStateContext);

    if(context==undefined){
        new Error("Context unreachable");
    }

    return context;
}

export const useInterestAction=()=>{
    const context=useContext(InterestActtionContext);

    if(context==undefined){
        new Error("Context unreachable");
    }

    return context;
}