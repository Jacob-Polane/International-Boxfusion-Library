'use client'
import React,{FC, useEffect, useState} from "react";
import NavBar from "@/components/navbar/NavBar";
// import Image from 'next/image';
import Book from '../../../public/book1.jpg';
import Banner from '../../../public/banner.jpg';
import {RightOutlined} from '@ant-design/icons'
import HorizontalContainer from "@/components/HorizontalContainer/HorizontalContainer";
import { Carousel,Card,Image} from 'antd';
import { useStyles } from "./style.explore";
import { useRouter } from "next/navigation";
const {Meta} = Card;

interface Idata{
    title: string,
    Author:string,
    BookImgUrl:string,
    Description:string
}


const Explore: React.FC  = () =>{
    const {styles}=useStyles();
    const router=useRouter();
    const [dataState,setData]=useState<any>([]);
    

    useEffect(()=>{

        fetch('https://www.googleapis.com/books/v1/volumes?q=inauthor:venter').then(data=>{
            data.json().then(datas=>setData(datas.items))
        })
        
       
    },[])
    
    return (
        <div>
            <NavBar/>
            <Carousel autoplay autoplaySpeed={5000}>
            <div>
              <h1 className={styles.contentStyle}>Welcome to Boxfusion International Library</h1>
            </div>
            <div>
              <div className={styles.contentStyle}>
                  <h1 >Login  <RightOutlined />    Collect    <RightOutlined />   Read</h1>
              </div>
            </div>
            <div>
              <h1 className={styles.contentStyle}>Trending, Top Genres, Recommendations</h1>
            </div>
            </Carousel>
            <div>
                <h1 className={styles.heading}>
                    Trending
                </h1>
                <HorizontalContainer>
                    {dataState.map((data:any)=>{
                        return (
                            <div key={data.volumeInfo.title} className={styles.cardiv} onClick={()=>router.push('/book')}>
                            <Card
                              hoverable
                              className={styles.card}
                              cover={<Image alt="example" src={data.volumeInfo.imageLinks.thumbnail} height={200}/>}
                            >
                              <Meta title={data.volumeInfo.title} description={data.volumeInfo.categories} />
                            </Card>
                            </div>
                        );
                    })}
                 </HorizontalContainer>
             </div>
             <div>
                <h1 className={styles.heading}>
                    Recommended for you
                </h1>
                <HorizontalContainer>
                    {dataState.map((data:any)=>{
                        return (
                            <div key={data.volumeInfo.title} className={styles.cardiv} onClick={()=>router.push('/book')}>
                            <Card
                              hoverable
                              className={styles.card}
                              cover={<Image alt="example" src={data.volumeInfo.imageLinks.thumbnail} height={200}/>}
                            >
                              <Meta title={data.volumeInfo.title} description={data.volumeInfo.categories} />
                            </Card>
                            </div>
                        );
                    })}
                 </HorizontalContainer>
             </div>
        </div>
    );
}

export default Explore;