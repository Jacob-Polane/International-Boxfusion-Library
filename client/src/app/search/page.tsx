'use client'
import React,{FC,useState,useEffect}from 'react';
import { useRouter } from 'next/navigation';
import {Form,type FormProps,Button,Input,List,message,Avatar} from 'antd';
import VirtualList from 'rc-virtual-list';
import NavBar from '@/components/navbar/NavBar';
import AuthGuard from '@/components/authGuard/AuthGuard';
import { IBook,IQuery } from '../../../models/interface';
import { useSearchActionContext, useSearchStateContext } from '@/providers/searchProvider';
import searchImage from '../../../public/searchImage.webp';
import Image from 'next/image';
import { useStyles } from './style.module';
import { useInterestAction, useInterestState } from '@/providers/InterestProvider';

const Search: FC =()=>{

  const status=useSearchStateContext();
  const {searchBook,clearBook,getBook}=useSearchActionContext();
  const router=useRouter();
  const {styles}=useStyles();

  useEffect(()=>{
    if(clearBook){clearBook()};
  },[])

  const onFinish: FormProps<IQuery>["onFinish"] = async (values:IQuery) => {
    values.isbn=values.isbn?values.isbn:'';
    values.author=values.author?values.author:'';
    values.Category=values.Category?values.Category:'';
    values.title=values.title?values.title:'';
    if(values.isbn===''&&
      values.author===''&&
      values.Category===''&&
      values.title===''){
        message.error("Please enter atleast one input")
        return;
      }
    if(searchBook){
      await searchBook(values);  
    }
  };

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - 500) <= 1) {
      //appendData();
    }
  };

  const viewBook =(id:string)=>{
    if(getBook){
      getBook(id);
      router.push('/book');
    }
    
  }

  return(
  <AuthGuard>
      <div >
         <NavBar/>
          <Form layout='inline'  className={styles.FormStyle} onFinish={onFinish}>
             <Form.Item <IQuery> label="ISBN" name="isbn">
              <Input  placeholder="Search by ISBN 10 or 13" style={{width:200}}/>
            </Form.Item>
            <Form.Item <IQuery> label="Author" name="author">
              <Input placeholder="Search by Author" style={{width:200}} />
            </Form.Item>
            <Form.Item <IQuery> label="Category" name="Category">
              <Input  placeholder="Search by category" style={{width:200}} />
            </Form.Item>
            <Form.Item <IQuery> label="Title" name="title">
              <Input  placeholder="Search by title" style={{width:200}} />
            </Form.Item>
            <Form.Item  wrapperCol={{ span: 8, offset: 0 }}>
              <Button type="primary" htmlType='submit'>Search</Button>
            </Form.Item>
          </Form>
          {(!status.books)?
          <Image  src={searchImage} alt='image' width={500} height={400} style={{marginTop:100,marginLeft:400}}></Image>         
          :<List style={{width:'100%',alignItems:'center',padding:20,display:'flex',justifyContent:'center',fontSize:20}}>
            <h1 style={{color:'#1BA1E2'}}>Results:</h1>
            <VirtualList
              data={status.books}
              height={500}
              itemHeight={60}
              itemKey="email"
              onScroll={onScroll}
              className={styles.VirtualistStyle}
            >
              {(item: IBook) => (
                <List.Item 
                  key={item.title} 
                  className={styles.ListItemStyle}
                  onClick={()=>{
                    viewBook(item.id)}}> 
                  <List.Item.Meta 
                    title={item.title}
                    description={`Author/s: ${item.author} Published on :${item.publishedDate}`}
                  />
                </List.Item>
              )}
            </VirtualList>
        </List>}
      </div>
      </AuthGuard>
    );
}

export default Search;