'use client'
import { useBookRequestState } from '@/providers/requestBookprovider';
import type { TableColumnsType } from 'antd';
import { Table } from 'antd';
import React, { ReactNode, useEffect } from 'react';
import { IBook } from '../../../models/interface';

type props={
    children?:ReactNode,
    history:IBook[]
}
const History: React.FC<props> = (props) => {
  const state=useBookRequestState();
  const data: IBook[] = state.history??[];

  useEffect(()=>{console.log(props?.history,'data')},[])
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
        width: '20%'
    }
  ];

  return <Table style={{padding:50,borderColor:'blue'}} columns={columns} dataSource={props?.history} />;
};

export default History;