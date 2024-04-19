'use client'
<<<<<<< HEAD
import { message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useContext, useReducer } from 'react';
import { useMutate } from 'restful-react';
import { ILogin, IUser } from '../../../models/interface';
import { useInterestAction } from '../InterestProvider';
import { useSearchActionContext } from '../searchProvider';
import { loginUserRequestAction, logOutUserRequestAction, setCurrentUserRequestAction } from './actions';
import { INITIAL_STATE, IUserActionContext, IUserStateContext, UserActionContext, UserContext } from './context';
import { reducer } from './reducer';
=======
import React, { FC, PropsWithChildren, useContext, useReducer } from 'react';
import { message } from 'antd';
import { useMutate } from 'restful-react';
import { useRouter } from 'next/navigation';
import { reducer} from './reducer';
import { INITIAL_STATE, IUserActionContext, IUserStateContext, UserActionContext, UserContext } from './context';
import { loginUserRequestAction,logOutUserRequestAction,setCurrentUserRequestAction} from './actions';
import { ILogin ,IUser} from '../../../models/interface';
import axios from 'axios';
import { useLocalStorage } from 'react-use';
import { delay } from 'lodash';
import useAxios from '..';
import { useSearchActionContext } from '../searchProvider';
import { useInterestAction } from '../InterestProvider';

>>>>>>> c5ea7cbf416650cbef8c5e50d0393d7faf8e88e8

const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { push } = useRouter();
<<<<<<< HEAD
  const {getRecommendedIntial} =useSearchActionContext();
  const {getInterestsIntialise}=useInterestAction();
=======
  const [local,setlocal]=useLocalStorage("token");
  const[role]=useLocalStorage("isLibrarian");
  const {instance}=useAxios();
>>>>>>> c5ea7cbf416650cbef8c5e50d0393d7faf8e88e8

  const {trendingBooks,getBookTrending,getRecommended}=useSearchActionContext();
  const {getInterests}=useInterestAction();
  

  const { mutate: createUserHttp } = useMutate({
    path: `${process.env.NEXT_PUBLIC_API_BASE_URI}services/app/Borrower/Create`,
    verb: 'POST',
  });


  const login = async (payload: ILogin) => {
        await instance.post('TokenAuth/Authenticate',payload).then(async (response)=>
          {
<<<<<<< HEAD
            console.log(getInterestsIntialise)
            localStorage.setItem('token', response.data.result.accessToken)
           
            console.log(localStorage.getItem('isLibrarian'))
            if(getRecommendedIntial&&localStorage.getItem('isLibrarian')==''){
            
              getRecommendedIntial(response.data.result.accessToken);
            }

            if(getInterestsIntialise&&localStorage.getItem('isLibrarian')==''){getInterestsIntialise(response.data.result.accessToken)}

=======
            
            setlocal(response.data.result.accessToken);
            console.log(response.data.result.accessToken,'token')
            delay(()=>(console.log("hello")),1000)
>>>>>>> c5ea7cbf416650cbef8c5e50d0393d7faf8e88e8
            dispatch(loginUserRequestAction(response.data.result))
            await getUserDetails(response.data.result.accessToken).then(()=>{
              
                                        if(role=='true'){
                                          push('/dashboard')
                                        }else{
                                          push("/explore");
                                        }
                                      
                                        message.success('Login successful')
                                        if(trendingBooks){trendingBooks()}
                                        if(getRecommended){getRecommended()}
                                        if(getInterests){getInterests()}
                                      }).catch(error=>{
                                                        message.error(error)
                                                        logOutUser();
                                                      })
                            })
                            .catch((response)=>message.error(response.response.data.error.message));
  }

  const createUser = async (payload: IUser) => {
    try {
      const response = await createUserHttp(payload);
      if (response.success) {
        message.success("User successfully created Login");
        push('/login');
      } else {
        message.error(response.error.message);
      }
    } catch (error:any) {
      message.error(error?.data.error.message);
    }
  };

  const getUserDetails = async (token?:any) => {
    
      const url=role==='false'?'services/app/Borrower/GetIdOfCurrentUser':'services/app/Librarian/GetIdOfCurrentUser';
      console.log(local,"toeky")
      if(!token){
      await instance.get(`${process.env.NEXT_PUBLIC_API_BASE_URI+url}`).then(response=>{
      if(response.data.result==null){
        throw "Select Correct User";
      }
      dispatch(setCurrentUserRequestAction(response.data.result));
    })
    .catch( (error) =>{
      console.log(error);
      throw error;
    })}else{
      await instance.get(`${process.env.NEXT_PUBLIC_API_BASE_URI+url}`,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }).then(response=>{
      
  
      if(response.data.result==null){
        throw "Select Correct User";
      }
      dispatch(setCurrentUserRequestAction(response.data.result));
    })
    .catch( (error) =>{
      console.log(error);
      throw error;
    })

    }
  }

  const logOutUser = () => {
    dispatch(logOutUserRequestAction());
    localStorage.clear()
    push('/login');
  };



  return (
    <UserContext.Provider value={{...state}}>
      <UserActionContext.Provider value={{ login, createUser, logOutUser, getUserDetails }}>
        
        {children}
      </UserActionContext.Provider>
    </UserContext.Provider>
  );
};


export const useLoginState = (): IUserStateContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useLoginState must be used within a UserProvider");
  }
  return context;
};

export const useLoginActions = (): IUserActionContext => {
  const context = useContext(UserActionContext);
  if (!context) {
    throw new Error("useLoginActions must be used within a UserProvider");
  }
  return context;
};

export const useUser = (): IUserStateContext & IUserActionContext => {
  return {
    ...useLoginState(),
    ...useLoginActions()
  };
};

export default AuthProvider;