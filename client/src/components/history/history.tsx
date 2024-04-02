'use client'
import React, { PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { GetRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { IBook } from '../../../models/interface';
import { useBookRequestState } from '@/providers/requestBookprovider';

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