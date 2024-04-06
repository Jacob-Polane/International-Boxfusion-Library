import { createContext } from 'react';
import { ILogin,IUser } from '../../../models/interface';

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