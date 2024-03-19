import React,{FC, PropsWithChildren,useEffect, useState} from 'react';
import { Button, Result } from 'antd';
import { useLoginState,useLoginActions } from '@/providers/authProvider';
import { useRouter } from 'next/navigation';


const AuthGuard : FC<PropsWithChildren>=({children})=>{
    const router=useRouter();
    const state=useLoginState();
    const {getUserDetails}=useLoginActions();
    const [logIn,setLogIn]=useState<boolean>(false);
    
    console.log(state)
    useEffect(()=>{
        checkLogin()
    },[])

    const checkLogin = ()=>{
        if(!state.currentUser){
            if(localStorage.getItem('token')){
                if(getUserDetails){
                    getUserDetails();
                    setLogIn(()=>true)
                }else{
                    setLogIn(()=>false);
                }
            }else{
                setLogIn(()=>false);
            }
        }else{
            setLogIn(()=>true)
        }
    }

    return (
        <>
            {logIn?
                children
                :
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button type="primary" onClick={()=>router.push('/')}>Back Home</Button>}
                />
            }
        </>
    );
}

export default AuthGuard;

