'use client'
import HorizontalContainer from "@/components/HorizontalContainer/HorizontalContainer";
import NavBar from "@/components/navbar/NavBar";
import { useInterestAction, useInterestState } from "@/providers/InterestProvider";
import { useLoginState } from "@/providers/authProvider";
import { useSearchActionContext, useSearchStateContext } from "@/providers/searchProvider";
import { RightOutlined } from '@ant-design/icons';
import { Card, Carousel, Image } from 'antd';
import { isEmpty } from 'lodash';
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IBook } from "../../../models/interface";
import { useStyles } from "./style.explore";
const {Meta} = Card;


const Explore: React.FC  = () =>{
    const {styles}=useStyles();
    const router=useRouter();
    const {UserLogin}=useLoginState();
    const state=useSearchStateContext();
    const {Interests}=useInterestState();
    const {getInterests}=useInterestAction();
    const {trendingBooks,getBookTrending,getRecommended}=useSearchActionContext();
    const {Recommendations}=useSearchStateContext();

    useEffect(()=>{
        if(trendingBooks){trendingBooks()}
        if(!Interests&&getInterests){
          getInterests();
        } 

        if(!Recommendations&&getRecommended){
          getRecommended();
        }
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
                              cover={<Image alt="trending" src={data.imageUrl===null?`data:image/png;base64,${data.imageString}`:data.imageUrl} height={200} width={200}/>}
                            >
                              <Meta title={data.title} description={"Category:   "+data.category} />
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
                              cover={<Image alt="recommendation" src={data.imageUrl===null?`data:image/png;base64,${data.imageString}`:data.imageUrl} height={200} width={200}/>}
                            >
                              <Meta title={data.title} description={"Category:   "+data.category} />
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