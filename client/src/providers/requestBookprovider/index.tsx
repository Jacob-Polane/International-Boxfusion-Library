'use client'
import React ,{ FC,PropsWithChildren, useContext, useReducer} from 'react';
import { INITIAL_STATE, IRequest, RequestActionContext, RequestContext, UpdateStatus } from './context';
import { reducer } from './reducer';
import { message } from 'antd';
import { clearRequestAction, requestBookAction, viewBookAction, viewRequestedBooksAction } from './action';
import { IBook } from '../../../models/interface';
import useAxios from '..';

const RequestProvider:FC<PropsWithChildren> = ({children})=>{
    const [state,dispatch]=useReducer(reducer,INITIAL_STATE);
    const getState=()=>({...state})
    const {instance}=useAxios();
    const requestBook =async (payload:IRequest)=>{
      await instance.post('services/app/Outbook/Create',payload).then(response=>
                                                                {
                                                                  dispatch(requestBookAction(response.data.result))
                                                                  message.success('Request Successful');
                                                                })
                                                                .catch((response)=>message.error(response.response.data.error.message));      
    }


    const viewHistory =async ()=>{
       await instance.get('services/app/Outbook/GetAllUser').then(response=>
        {
          dispatch(viewBookAction(response.data.result.map((data:any)=>({...data.book,status:data.status}))))
        })
        .catch((response)=>message.error(response.response.data.error.message)); 
    }
    
    const viewAllRequest =async (status:string)=>{
      await instance.get(`services/app/Outbook/GetAll?status=${status}`).then(response=>
        {
          dispatch(viewRequestedBooksAction(response.data.result.map((data:any)=>({...data.book,status:data.status,oid:data.id}))))
        })
        .catch((response)=>message.error(response.response.data.error.message)); 
    }

    const changeBookState=async (payload:UpdateStatus)=>{
      await instance.post('services/app/Outbook/Update',payload).then(response=>
        {
          viewAllRequest('');
          message.success('Request Successful');
        })
        .catch((response)=>message.error(response.response.data.error.message)); 
    }

    const createBook =async (payload:IBook)=>{
      await instance.post('services/app/Book/Create',payload).then(data=>{message.success("book created")}).catch((response)=>message.error(response.response.data.error.message()))
    }

    const clearRequest=()=>{
      dispatch(clearRequestAction({}))
    }
    return (
    <RequestContext.Provider value={getState()}>
        <RequestActionContext.Provider value={{requestBook,viewHistory,viewAllRequest,changeBookState,createBook,clearRequest}}>
        {children}
        </RequestActionContext.Provider>
    </RequestContext.Provider>);
}

export default RequestProvider;

export const useBookRequestState=()=>{
    const context = useContext(RequestContext);
    return context;
}
export const useBookRequestAction =()=>{
    const context = useContext(RequestActionContext);
    return context;
}
export const useBookRequest=()=>{
    return {...useBookRequestState(),...useBookRequestAction()};
}