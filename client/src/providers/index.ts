import React,{FC, PropsWithChildren} from 'react';
import axios from 'axios';
<<<<<<< HEAD
import {useLocalStorage} from 'react-use';
import { useLoginState } from './authProvider';
// Create a new Axios instance with default configuration
const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URI}`,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
});
=======
import { useLocalStorage } from 'react-use';


// Create a new Axios instance with default configuration
const useAxios=()=>{

  const [local,setLocal]=useLocalStorage("token");
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URI}`,
    headers: {
      'Authorization': `Bearer ${local}`,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  });
  return{instance};
}
export default useAxios;

>>>>>>> c5ea7cbf416650cbef8c5e50d0393d7faf8e88e8
 
