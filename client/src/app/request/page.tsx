'use client'
import DashNav from '@/components/dashboardNav/dashnav';
import { useBookRequestState } from '@/providers/requestBookprovider';
import { Table, message } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import useReqHelper from '../../../utilis/request/helper';




const Request:React.FC =()=>{
    const {push}=useRouter();
    const state=useBookRequestState();
    const {columns}=useReqHelper();
    
      return (
        
            <DashNav>
                {state?.booksRequested?      
                    <Table title={()=>'Requests'} style={{padding:50,backgroundColor:'#cfdddd',height:'80vh'}} columns={columns} dataSource={state?.booksRequested} pagination={{pageSize:4}}/>
                :
                <>
                    {message.error('no books')}
                    {push('/dashboard')}
                </>
                }
            </DashNav>
        
      );
}

export default Request;