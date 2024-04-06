'use client'
import React, { useEffect ,useState} from 'react';
import {Table,TableColumnsType,message} from 'antd';
import { useBookRequestState } from '@/providers/requestBookprovider';
import { IBook } from '../../../models/interface';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/authGuard/AuthGuard';
import NavBar from '@/components/navbar/NavBar';


const Test:React.FC =()=>{
    
    const state=useBookRequestState();
    const router=useRouter();
    const columns: TableColumnsType<IBook> = [
        {
          title: 'title',
          dataIndex: 'title',
          key: 'title',
          width: '30%'
          
        },
        {
          title: 'author',
          dataIndex: 'author',
          key: 'author',
          width: '20%'
         
        },
        {
            title: 'category',
            dataIndex: 'category',
            key: 'category',
            width: '20%'
            
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            width: '20%',
            render: (status: number) => getStatusText(status)
        }
      ];
    
    const getStatusText = (status: number): string => {
        switch (status) {
            case 1:
                return 'Pending';
            case 2:
                return 'Ready To Be Collected';
            case 3:
                return 'Collected';
            case 4:
              return 'Returned';
            // Add more cases as needed
            default:
                return 'Unknown';
        }
    };
      return (
        <AuthGuard>
            {state?.history ?
            <>
                <NavBar/>
                <Table title={()=>'History'} style={{padding:50,backgroundColor:'#cfdddd',height:'100vh'}} columns={columns} dataSource={state?.history} />
            </>
            :
            <>
              {
                message.error('no books')
              }
              {router.push('/explore')}
            </>
            }
        </AuthGuard>
      );
}

export default Test;