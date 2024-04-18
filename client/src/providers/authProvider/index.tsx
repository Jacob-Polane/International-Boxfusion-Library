'use client'
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

const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { push } = useRouter();
  const {getRecommendedIntial} =useSearchActionContext();
  const {getInterestsIntialise}=useInterestAction();

// Create a new Axios instance with default configuration
const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URI}`,
  headers: {
    'Content-Type': 'application/json'
  }
});
  
  
  const { mutate: createUserHttp } = useMutate({
    path: `${process.env.NEXT_PUBLIC_API_BASE_URI}services/app/Borrower/Create`,
    verb: 'POST',
  });




  const login = async (payload: ILogin) => {
        await instance.post('TokenAuth/Authenticate',payload).then(async (response)=>
          {
            console.log(getInterestsIntialise)
            localStorage.setItem('token', response.data.result.accessToken)
           
            console.log(localStorage.getItem('isLibrarian'))
            if(getRecommendedIntial&&localStorage.getItem('isLibrarian')==''){
            
              getRecommendedIntial(response.data.result.accessToken);
            }

            if(getInterestsIntialise&&localStorage.getItem('isLibrarian')==''){getInterestsIntialise(response.data.result.accessToken)}

            dispatch(loginUserRequestAction(response.data.result))
            getUserDetails().then(()=>{
                                        if(localStorage.getItem('isLibrarian')=='true'){
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
        console.log(response)
        message.error(response.error.message);
      }
    } catch (error:any) {
      message.error(error?.data.error.message);
    }
  };

  const getUserDetails = async () => {
    const token = localStorage.getItem("token");
    const user=localStorage.getItem("isLibrarian");
    try {
      const url=user=='false'?'services/app/Borrower/GetIdOfCurrentUser':'services/app/Librarian/GetIdOfCurrentUser';
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI+url}`, {
        method: 'GET',
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
      console.log(data.result,'shasha')
      if(data.result==null){
        throw "Select Correct User";
      }
      dispatch(setCurrentUserRequestAction(data.result));
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logOutUser = () => {
    dispatch(logOutUserRequestAction());
    localStorage.clear();
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