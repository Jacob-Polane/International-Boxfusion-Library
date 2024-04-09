'use client'
import React from 'react';
import {Table,message} from 'antd';
import { useBookRequestState } from '@/providers/requestBookprovider';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/authGuard/AuthGuard';
import NavBar from '@/components/navbar/NavBar';
import useHistoryHelper from '../../../utilis/history/history';


const Test:React.FC =()=>{
    
    const state=useBookRequestState();
    const router=useRouter();
    const {columns}=useHistoryHelper();
    
      if(!state?.history){
        router.push('/explore')
        message.error('no history books')
        return ;
      }
      return (
        <AuthGuard>
          <NavBar/>
          <Table title={()=>'History'} style={{padding:50,backgroundColor:'#cfdddd',height:'100vh'}} columns={columns} dataSource={state.history&&state?.history} />
        </AuthGuard>
      );
}

export default Test;