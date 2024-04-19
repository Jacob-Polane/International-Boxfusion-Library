'use client'
import { message } from 'antd';
<<<<<<< HEAD
import { FC, PropsWithChildren, useContext, useReducer } from 'react';
import instance from '..';
import { IBook } from '../../../models/interface';
import { deleteStateAction, requestBookAction, updateAction, viewBookAction, viewRequestedBooksAction } from './action';
import { INITIAL_STATE, IRequest, RequestActionContext, RequestContext, UpdateStatus } from './context';
import { reducer } from './reducer';
=======
import { clearRequestAction, requestBookAction, viewBookAction, viewRequestedBooksAction } from './action';
import { IBook } from '../../../models/interface';
import useAxios from '..';
>>>>>>> c5ea7cbf416650cbef8c5e50d0393d7faf8e88e8

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


    const update=async(payload:IBook)=>{
      await instance.put('services/app/Book/Update',payload).then((res)=>{
        dispatch(updateAction({...state.books?.filter(x=>x.id!==payload.id),...res.data.result}))
        message.success("successfully updated")
      }).catch(response=>message.error(response.response.data.error.message()))
    }

<<<<<<< HEAD
    const deleteBook =async (id:string)=>{
      await instance.delete(`services/app/Book/Delete?Id=${id}`).then(response=>{
        dispatch(deleteStateAction(state.books?.filter(x=>x.id===id)??[]))
        message.success("Successfully Deleted");
      })
    }

    const createBook =async (payload:IBook)=>{

    
      const formData = new FormData();
      //book.categoryID = "1E27D26D-8EF9-411D-94E9-08DC4A40801A";
      formData.append('title', payload.title);
      formData.append('author', payload?.author);
      formData.append('publisher', payload?.publisher??'');
      formData.append('category', payload.category);
      formData.append('isbn10', payload?.isbn10??'');
      formData.append('isbn13', payload?.isbn13??'');
      formData.append('description', payload?.description??'');
      formData.append('publishedDate',payload.publishedDate??'');
      formData.append('file', payload.fileData );
      await instance.post('services/app/Book/CreateBook',formData
      ,
        { headers: {
          'Content-Type': 'multipart/form-data',
        }}
      ).then(data=>{console.log(data) ;message.success("book created")}).catch((response)=>message.error(response.response.data.error.message()))
    }

    
    return (
    <RequestContext.Provider value={getState()}>
        <RequestActionContext.Provider value={{requestBook,viewHistory,viewAllRequest,changeBookState,createBook,update,deleteBook}}>
=======
    const clearRequest=()=>{
      dispatch(clearRequestAction({}))
    }
    return (
    <RequestContext.Provider value={getState()}>
        <RequestActionContext.Provider value={{requestBook,viewHistory,viewAllRequest,changeBookState,createBook,clearRequest}}>
>>>>>>> c5ea7cbf416650cbef8c5e50d0393d7faf8e88e8
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