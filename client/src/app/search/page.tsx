'use client'
import AuthGuard from '@/components/authGuard/AuthGuard';
import NavBar from '@/components/navbar/NavBar';
import { useSearchActionContext, useSearchStateContext } from '@/providers/searchProvider';
import { Button, Form, Input, List, message, type FormProps } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import VirtualList from 'rc-virtual-list';
import React, { FC, useEffect } from 'react';
import { useSearchParam } from 'react-use';
import { IBook, IQuery } from '../../../models/interface';
import searchImage from '../../../public/searchImage.webp';
import { useStyles } from './style.module';

const Search: FC =()=>{
  const searchTerm=useSearchParam('searchTerm');

  const status=useSearchStateContext();
  const {searchBook,clearBook,getBook}=useSearchActionContext();
  const router=useRouter();
  const {styles}=useStyles();

  useEffect(()=>{
    if(clearBook){clearBook()};
    if(searchTerm!==null){
      if(onFinish)
      onFinish({searchTerm:`${searchTerm}`});
    }
  },[])

  const onFinish: FormProps<IQuery>["onFinish"] = async (values:IQuery) => {
    
    if(values.searchTerm==''){
        message.error("Please enter atleast one input")
        return;
      }
      //const query=new URLSearchParams({...values});
      //.pushState({}, '', location.pathname + '?'+'title=123')
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
          <Form layout='inline'  
              className={styles.FormStyle} 
              onFinish={onFinish}
              initialValues={{searchTerm:searchTerm!==null?searchTerm:''}}
              >
             <Form.Item <IQuery>  name="searchTerm">
              <Input  placeholder="Use keyword to search" style={{width:500}}/>
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