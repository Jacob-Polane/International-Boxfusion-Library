'use client'
import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
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


const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { push } = useRouter();
  const [local,setlocal]=useLocalStorage("token");
  const[role]=useLocalStorage("isLibrarian");
  const {instance}=useAxios();

// Create a new Axios instance with default configuration
// const instance = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URI}`,
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });
  
  
  const { mutate: createUserHttp } = useMutate({
    path: `${process.env.NEXT_PUBLIC_API_BASE_URI}services/app/Borrower/Create`,
    verb: 'POST',
  });




  const login = async (payload: ILogin) => {
        await instance.post('TokenAuth/Authenticate',payload).then(async (response)=>
          {
            
            setlocal(response.data.result.accessToken);
            console.log(response.data.result.accessToken,'token')
            delay(()=>(console.log("hello")),1000)
            dispatch(loginUserRequestAction(response.data.result))
            await getUserDetails(response.data.result.accessToken).then(()=>{
              
                                        if(role=='true'){
                                          push('/dashboard')
                                        }else{
                                          push("/explore");
                                        }
                                      
                                        message.success('Login successful')
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
    setlocal('');
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