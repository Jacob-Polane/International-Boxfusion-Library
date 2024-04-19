'use client'
<<<<<<< HEAD
import AuthGuard from '@/components/authGuard/AuthGuard';
import NavBar from '@/components/navbar/NavBar';
import { useBookRequestState } from '@/providers/requestBookprovider';
import { Table, TableColumnsType, message } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IBook } from '../../../models/interface';
=======
import React from 'react';
import {Table,message} from 'antd';
import { useBookRequestState } from '@/providers/requestBookprovider';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/authGuard/AuthGuard';
import NavBar from '@/components/navbar/NavBar';
import useHistoryHelper from '../../../utilis/history/history';
>>>>>>> c5ea7cbf416650cbef8c5e50d0393d7faf8e88e8


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