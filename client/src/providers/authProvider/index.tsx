'use client'
import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { message } from 'antd';
import { useGet, useMutate } from 'restful-react';
import { useRouter } from 'next/navigation';
import { reducer} from './reducer';
import { ILogin, INITIAL_STATE, IUser, IUserActionContext, IUserStateContext, UserActionContext, UserContext } from './context';
import { loginUserRequestAction,logOutUserRequestAction,setCurrentUserRequestAction} from './actions';


const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { push } = useRouter();

  const { mutate: loginUserHttp } = useMutate({
    path: `${process.env.NEXT_PUBLIC_API_BASE_URI}TokenAuth/Authenticate`,
    verb: 'POST',
  });
  
  const { mutate: createUserHttp } = useMutate({
    path: `${process.env.NEXT_PUBLIC_API_BASE_URI}services/app/Person/Create`,
    verb: 'POST',
  });




  const login = async (payload: ILogin) => {
    try {
      const response = await loginUserHttp(payload);
      if (response.success) {
        localStorage.setItem('token', response.result.accessToken);

        dispatch(loginUserRequestAction(response.result));
        console.log(response.result)
        await getUserDetails();
        push("/explore");
        message.success('Login successful');
      } else {
        message.error('Invalid username or password');
      }
    } catch (error) {
      console.log(error);
      message.error('Login failed');
    }
  };

  const createUser = async (payload: IUser) => {
    console.log("response::", payload);
    try {
      const response = await createUserHttp(payload);
      console.log("response::", response);
      if (response.success) {
        message.success("User successfully created");
        console.log(response.result);
       
      } else {
        message.error("Failed to create user");
      }
    } catch (error) {
      console.error("User creation error:", error);
      message.error("An error occurred during user creation");
    }
  };

  const getUserDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}services/app/Session/GetCurrentLoginInformations`, {
        method: 'GET',
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
      console.log(data);
      dispatch(setCurrentUserRequestAction(data.result.user));
    } catch (error) {
      console.log(error);
      message.error("Failed to get user details");
    }
  };

  const logOutUser = () => {
    dispatch(logOutUserRequestAction());
    localStorage.removeItem('token');
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