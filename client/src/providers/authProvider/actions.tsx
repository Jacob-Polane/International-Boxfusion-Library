import  React from 'react';
import { createAction } from 'redux-actions';
import {ILogin, IUser, IUserStateContext} from './context';

export enum UserActionEnum{
    LOGIN_USER = 'LOGIN',
    CREATE_USRER = 'CREATE',
    LOGOUT_USER = 'LOGOUT',
    SET_CURRENT_USER = 'SET_CURRENT_USER',
    GET_USER_DETAILS='GET_USER',
    GET_USER_ID = 'GET_USER_ID',
}

export const loginUserRequestAction = createAction<IUserStateContext, ILogin>(UserActionEnum.LOGIN_USER,(UserLogin)=>({UserLogin}))
export const logOutUserRequestAction = createAction<IUserStateContext>(UserActionEnum.LOGOUT_USER,()=>({}))
export const setCurrentUserRequestAction = createAction<IUserStateContext, IUser>(UserActionEnum.SET_CURRENT_USER,(currentUser)=>({currentUser}))
