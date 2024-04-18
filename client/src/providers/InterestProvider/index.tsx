'use client'
import { FC, PropsWithChildren, useContext, useReducer } from 'react';
import instance from '..';
import { useSearchActionContext } from '../searchProvider';
import { getInterestAction } from './action';
import { InterestActtionContext, InterestStateContext } from './context';
import { reducer } from './reducer';

const InterestsProvider:FC<PropsWithChildren>=({children})=>{
    const [state,dispath] = useReducer(reducer,{});
    const {getRecommended}=useSearchActionContext();
    const getInterests= async ()=>{ 
        await instance.get('services/app/Borrower/GetInterests').then(response=>
            {
                console.log(response.data.result.interestCategory);
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

    return (
        <InterestStateContext.Provider value={{...state}}>
            <InterestActtionContext.Provider value={{getInterests,saveInterests,getInterestsIntialise}}>
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