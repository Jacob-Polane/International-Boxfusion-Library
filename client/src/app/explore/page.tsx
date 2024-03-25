'use client'
import React,{FC} from "react";
import NavBar from "@/components/navbar/NavBar";
import Image from 'next/image';
import Book from '../../../public/book1.jpg';
import Banner from '../../../public/banner.jpg';
import {RightOutlined} from '@ant-design/icons'
import HorizontalContainer from "@/components/HorizontalContainer/HorizontalContainer";
import { Carousel,Card} from 'antd';
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

    const data:Idata[]=[
        {
            title: 'The late night',
            Author:'PJ Mahloko',
            BookImgUrl:'https://www.bibalex.org/SCIplanet/Attachments/Article/MediumImage/wmCo7XflZf_20210412112248843.jpg',
            Description:'The late night remedies of south africa'
        },
        {
            title: 'The late night 2',
            Author:'PJ Mahloko',
            BookImgUrl:'https://www.bibalex.org/SCIplanet/Attachments/Article/MediumImage/wmCo7XflZf_20210412112248843.jpg',
            Description:'The late night remedies of south africa'
        },
        {
            title: 'The late night 3',
            Author:'PJ Mahloko',
            BookImgUrl:'https://www.bibalex.org/SCIplanet/Attachments/Article/MediumImage/wmCo7XflZf_20210412112248843.jpg',
            Description:'The late night remedies of south africa'
        },
        {
            title: 'The late night 4',
            Author:'PJ Mahloko',
            BookImgUrl:'https://www.bibalex.org/SCIplanet/Attachments/Article/MediumImage/wmCo7XflZf_20210412112248843.jpg',
            Description:'The late night remedies of south africa'
        },
        {
            title: 'The late night 5',
            Author:'PJ Mahloko',
            BookImgUrl:'https://www.bibalex.org/SCIplanet/Attachments/Article/MediumImage/wmCo7XflZf_20210412112248843.jpg',
            Description:'The late night remedies of south africa'
        },
        {
            title: 'The late night 6',
            Author:'PJ Mahloko',
            BookImgUrl:'https://www.bibalex.org/SCIplanet/Attachments/Article/MediumImage/wmCo7XflZf_20210412112248843.jpg',
            Description:'The late night remedies of south africa'
        },
        {
            title: 'The late night 7',
            Author:'PJ Mahloko',
            BookImgUrl:'https://www.bibalex.org/SCIplanet/Attachments/Article/MediumImage/wmCo7XflZf_20210412112248843.jpg',
            Description:'The late night remedies of south africa'
        },
        {
            title: 'The late night 8',
            Author:'PJ Mahloko',
            BookImgUrl:'https://www.bibalex.org/SCIplanet/Attachments/Article/MediumImage/wmCo7XflZf_20210412112248843.jpg',
            Description:'The late night remedies of south africa'
        },
        {
            title: 'The late night 9',
            Author:'PJ Mahloko',
            BookImgUrl:'https://www.bibalex.org/SCIplanet/Attachments/Article/MediumImage/wmCo7XflZf_20210412112248843.jpg',
            Description:'The late night remedies of south africa'
        },
        {
            title: 'The late night 10',
            Author:'PJ Mahloko',
            BookImgUrl:'https://www.bibalex.org/SCIplanet/Attachments/Article/MediumImage/wmCo7XflZf_20210412112248843.jpg',
            Description:'The late night remedies of south africa'
        },
    ]
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
                    {data.map((data)=>{
                        return (
                            <div key={styles.cardiv} className={styles.cardiv} onClick={()=>router.push('/book')}>
                            <Card
                              hoverable
                              className={styles.card}
                              cover={<Image alt="example" src={Book} />}
                            >
                              <Meta title={data.title} description={data.Description} />
                            </Card>
                            </div>
                        );
                    })}
                 </HorizontalContainer>
             </div>
             <div>
                <h1 className={styles.heading}>
                    Top 5 Genres
                </h1>
                <HorizontalContainer>
                    {data.map((data)=>{
                        return (
                            <div key={styles.cardiv} className={styles.cardiv}>
                            <Card
                              hoverable
                              className={styles.card}
                              cover={<Image alt="example" src={Book} />}
                            >
                              <Meta title={data.title} description={data.Description} />
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