import React,{FC, PropsWithChildren} from 'react';
import axios from 'axios';
import useLocalStorage  from '@/hooks';


// Create a new Axios instance with default configuration
const useAxios=()=>{
  const {storedValue:local,setValue:setLocal}=useLocalStorage("token","");
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

 
