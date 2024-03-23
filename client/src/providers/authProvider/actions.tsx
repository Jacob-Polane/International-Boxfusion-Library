import  React from 'react';
import { createAction } from 'redux-actions';
import {IUserStateContext} from './context';
import { IUser,ILogin } from '../../../models/interface';

export enum UserActionEnum{
    LOGIN_USER = 'LOGIN',
    LOGOUT_USER = 'LOGOUT',
    SET_CURRENT_USER = 'SET_CURRENT_USER',

}

export const loginUserRequestAction = createAction<IUserStateContext, ILogin>(UserActionEnum.LOGIN_USER,(UserLogin)=>({UserLogin}))
export const logOutUserRequestAction = createAction<IUserStateContext>(UserActionEnum.LOGOUT_USER,()=>({}))
export const setCurrentUserRequestAction = createAction<IUserStateContext, IUser>(UserActionEnum.SET_CURRENT_USER,(currentUser)=>({currentUser}))
