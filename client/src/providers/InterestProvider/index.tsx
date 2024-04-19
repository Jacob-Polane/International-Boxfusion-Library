'use client'
import { FC, PropsWithChildren, useContext, useReducer } from 'react';
import instance from '..';
import { useSearchActionContext } from '../searchProvider';
import { getInterestAction } from './action';
import { InterestActtionContext, InterestStateContext } from './context';
import { reducer } from './reducer';
<<<<<<< HEAD
=======
import { clearRequestAction, getInterestAction } from './action';
import { useSearchActionContext } from '../searchProvider';
import useAxios from '..';
>>>>>>> c5ea7cbf416650cbef8c5e50d0393d7faf8e88e8

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


    const getInterestsIntialise= async (token:string)=>{ 
        await instance.get('services/app/Borrower/GetInterests',{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
              }
        }).then(response=>
            {
                console.log(response.data.result.interestCategory);
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
<<<<<<< HEAD
            <InterestActtionContext.Provider value={{getInterests,saveInterests,getInterestsIntialise}}>
=======
            <InterestActtionContext.Provider value={{getInterests,saveInterests,clearRequest}}>
>>>>>>> c5ea7cbf416650cbef8c5e50d0393d7faf8e88e8
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