'use client'
import React,{FC, useEffect, useState} from 'react';
import { Card ,Row,Tag,Button} from 'antd'
import { useStyles } from './style.module';
import Image from 'next/image';
import book from '../../../public/book1.jpg'
import NavBar from '@/components/navbar/NavBar';
import AuthGuard from '@/components/authGuard/AuthGuard';
import { useSearchStateContext } from '@/providers/searchProvider';
import { useRouter } from 'next/navigation';


const Book: FC =()=>{
    const [loading,setLoading]=useState(true);
    const {styles}=useStyles();

    const state=useSearchStateContext();
    const router=useRouter();
    useEffect(()=>{
        setTimeout(()=>setLoading(false),3000);
    },[])

    return (
        <AuthGuard>
            <NavBar/>
            <div className={styles.BookContainer} >
            {state.book?<Card title={state.book?.title} bordered={true} className={styles.BookCard} hoverable loading={loading}>
                <Row >
                    <Image style={{height:200,width:200}} src={book} alt='book cover'/>

                    <div className={styles.Authors}>
                        <h3 style={{color:'gray'}}>Authors:</h3>
                        <div>
                            {(state.book?.author.split(','))?.map((data)=>(
                                <Tag key={data} color='cyan'> {data}</Tag>
                            ))}
                        </div>
                        <p style={{color:'gray'}}><span style={{fontWeight:'bold',fontSize:14}}>Published date:</span> {state.book?.publishedDate}</p>
                        <div>
                            {(state.book?.category.split(','))?.map((data)=>(
                                <Tag key={data} color='gold'> {data}</Tag>
                            ))}
                        </div>
                    </div>
                    <div key={styles.buttonSelect} className={styles.buttonSelect}>
                        <Button style={{backgroundColor:'#1BA1E2',color:'white'}}className={styles.button}>Review Book</Button>
                        <Button style={{backgroundColor:'green',color:'white'}} className={styles.button}>Request</Button>
                    </div>
                </Row>
                <Row >
                    <h4 style={{padding:0}}>Desciption</h4>
                    <p style={{padding:0}}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla minima ad possimus eos modi architecto! Vel aliquid repellat,
                         voluptatem soluta cum, esse rerum nisi, minus omnis eos sed. Consectetur, expedita! Lorem ipsum dolor sit amet consectetur 
                         adipisicing elit. Mollitia, error nostrum. Aliquid quasi hic distinctio. Nisi magnam aut facere reprehenderit quos explicabo
                          nulla, distinctio exercitationem dolorum? Aliquid neque debitis totam!
                    </p> 
                </Row>
            </Card>:<>{router.push('/search')}</>}
            </div>
        </AuthGuard>
    );
}

export default Book;
