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
import { useSearchActionContext, useSearchStateContext } from "@/providers/searchProvider";
import { IBook } from "../../../models/interface";
import {isEmpty} from 'lodash';
const {Meta} = Card;



const Explore: React.FC  = () =>{
    const {styles}=useStyles();
    const router=useRouter();
    const state=useSearchStateContext();
    const {trendingBooks,getBookTrending,getRecommended}=useSearchActionContext();
    

    useEffect(()=>{
        if(trendingBooks){trendingBooks()}
        if(getRecommended){getRecommended()}
    },[])

    const viewBook =(id:string)=>{
        if(getBookTrending){
            getBookTrending(id);
          router.push('/book');
        }
        
      }
    
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
                    {state?.trending?.map((data:IBook)=>{
                        return (
                            <div key={data.id} className={styles.cardiv} onClick={()=>{viewBook(data.id)}}>
                            <Card
                              hoverable
                              className={styles.card}
                              cover={<Image alt="example" src={data.imageUrl} height={200} width={200}/>}
                            >
                              <Meta title={data.title} description={data.author+"  Date:"+data.publishedDate} />
                            </Card>
                            </div>
                        );
                    })}
                 </HorizontalContainer>
             </div>
             {!isEmpty(state?.Recommendations)&&<div>
                <h1 className={styles.heading}>
                    Recommended for you
                </h1>
                <HorizontalContainer>
                {state?.Recommendations?.map((data:IBook)=>{
                        return (
                            <div key={data.id} className={styles.cardiv} onClick={()=>{viewBook(data.id)}}>
                            <Card
                              hoverable
                              className={styles.card}
                              cover={<Image alt="example" src={data.imageUrl} height={200} width={200}/>}
                            >
                              <Meta title={data.title} description={data.author+"  Date:"+data.publishedDate} />
                            </Card>
                            </div>
                        );
                    })}
                 </HorizontalContainer>
             </div>}
        </div>
    );
}

export default Explore;