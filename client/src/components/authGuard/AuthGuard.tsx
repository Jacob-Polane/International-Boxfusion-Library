import React,{FC, PropsWithChildren,useEffect, useState} from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';
import { useCheckAUth } from '../../../utilis/navbar/helper';


const AuthGuard : FC<PropsWithChildren>=({children})=>{
    const router=useRouter();
    const {logIn,checkLogin,logOutUser,getUserDetails}=useCheckAUth();

    useEffect(()=>{
        checkLogin();
    })

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
                    style={{marginTop:100}}
                />
            }
        </>
    );
}

export default AuthGuard;

