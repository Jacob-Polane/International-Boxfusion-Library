'use client'
import React,{FC, useEffect, useState} from 'react';
import { Card ,Row,Tag,Button,Image} from 'antd'
import { useStyles } from './style.module';

import book from '../../../public/book1.jpg'
import NavBar from '@/components/navbar/NavBar';
import AuthGuard from '@/components/authGuard/AuthGuard';
import { useSearchStateContext } from '@/providers/searchProvider';
import { useRouter } from 'next/navigation';
import { useBookRequestAction, useBookRequestState } from '@/providers/requestBookprovider';
import { IRequest } from '@/providers/requestBookprovider/context';
import { useLoginState } from '@/providers/authProvider';
import {Comment,params,ViewComment} from '@/components/comments';
import { useCommentAction } from '@/providers/commentProvider';


const Book: FC =()=>{
    const [loading,setLoading]=useState(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDrawerOpen,setDrawerOpen] =useState<boolean>(false);
    const {styles}=useStyles();

    const status =useLoginState();
    const state=useSearchStateContext();
    const bookRequest=useBookRequestState();
    const {requestBook}=useBookRequestAction();
    const router=useRouter();
    const {getComments}=useCommentAction();

    const request=(id:string)=>{
        const values:IRequest={
            bookId:id,
            borrowerId:status.currentUser?.id,
            status:1
        }
        console.log(values)
        requestBook&&requestBook(values);
    }
    useEffect(()=>{
        setTimeout(()=>setLoading(false),3000);
        console.log(bookRequest);
        getComments&&getComments(state?.book?.id??'');
    },[])

    return (
        <AuthGuard>
            
            <NavBar/>
            <div className={styles.BookContainer} >
            {state.book?<Card title={state.book?.title} bordered={true} className={styles.BookCard} hoverable loading={loading}>
                <Row >
                    <Image  src={state.book.imageUrl} alt='book cover'/>

                    <div className={styles.Authors}>
                        <h3 style={{color:'gray'}}>Authors:</h3>
                        <div>
                            {(state.book?.author.split(','))?.map((data)=>(
                                <Tag key={data} color='cyan'> {data}</Tag>
                            ))}
                        </div>
                        <p style={{color:'gray'}}><span style={{fontWeight:'bold',fontSize:14}}>Published date:</span> {state.book?.publishedDate?.substring(0,10)}</p>
                        <div>
                            {(state.book?.category.split(','))?.map((data)=>(
                                <Tag key={data} color='gold'> {data}</Tag>
                            ))}
                        </div>
                    </div>
                    <div key={styles.buttonSelect} className={styles.buttonSelect}>
                        <Button key='review book' style={{backgroundColor:'#1BA1E2',color:'white'}}className={styles.button} onClick={()=>setIsModalOpen(true)}>Review Book</Button>
                        <Comment setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} id={state?.book.id}/>
                        <Button key ='view reviews' style={{color:'#1BA1E2',backgroundColor:'white',border:'2px solid #1BA1E2'}}className={styles.button} onClick={()=>setDrawerOpen(true)}>View Reviews</Button>
                        <ViewComment setDrawerOpen={setDrawerOpen} isDrawerOpen={isDrawerOpen} id={state?.book.id}/>
                        <Button style={{backgroundColor:'green',color:'white'}} className={styles.button} onClick={()=>{request(state.book?.id??'')}}>Request</Button>
                    </div>
                </Row>
                <Row >
                    <h4 style={{padding:0}}>Desciption</h4>
                    <p style={{padding:0}}>
                        {state.book.description}
                    </p> 
                </Row>
            </Card>:<>{router.push('/search')}</>}
            </div>
        </AuthGuard>
    );
}

export default Book;
