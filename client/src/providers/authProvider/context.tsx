import { createContext } from 'react';

export interface IUser {
    id: string;
    Username: string;
    Name: string;
    Surname: string;
    PhoneNumber: string;
    EmailAddress: string;
    Password: string;
  }
  

export interface ILogin{
    userNameOrEmailAddress: string,
    password: string,
    remember:boolean
  }


export const INITIAL_STATE: IUserStateContext={}

export interface IUserStateContext {
    readonly UserLogin? : ILogin;
    readonly currentUser?: IUser;   
}

export interface IUserActionContext{
    login?:(payload:ILogin) => void;
    createUser?:(payload:IUser) => void;
    logOutUser?:() => void;
    getUserDetails?:() => void;
}

const UserContext = createContext<IUserStateContext>(INITIAL_STATE);

const UserActionContext = createContext<IUserActionContext>({});

export {UserContext, UserActionContext};