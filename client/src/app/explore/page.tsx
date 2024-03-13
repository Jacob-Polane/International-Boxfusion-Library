'use client'
import React,{FC} from "react";
import NavBar from "@/components/navbar/NavBar";
import Image from 'next/image';
import Book from '../../../public/book1.jpg';
import Banner from '../../../public/banner.jpg';
import Banner2 from '../../../public/banner2.jpg';
import {RightOutlined} from '@ant-design/icons'
import HorizontalContainer from "@/components/HorizontalContainer/HorizontalContainer";
import { Carousel,Card} from 'antd';

const {Meta} = Card;

interface Idata{
    title: string,
    Author:string,
    BookImgUrl:string,
    Description:string
}

const contentStyle: React.CSSProperties = {
    marginTop:'20px',
    height: '160px',
    width:'100%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#1BA1E2',
  };
const Explore: React.FC  = () =>{
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
        <>
            <NavBar/>
            <Carousel autoplay autoplaySpeed={5000}>
              <div>
                <h1 style={contentStyle}>Welcome to Boxfusion International Library</h1>
              </div>
              <div>
                <div style={contentStyle}>
                    <h1 >Login  <RightOutlined />    Collect    <RightOutlined />   Read</h1>
                </div>
                
              </div>
              <div>
                <Image style={contentStyle} src={Banner} alt ='book'/>
              </div>
            </Carousel>
            <div>
                <h1 style={{marginLeft:30,color:'#1BA1E2'}}>
                    Trending
                </h1>
                <HorizontalContainer>
                    {data.map((data)=>{
                        return (
                            <div style={{ display: 'inline-block', width: '270px' }}>
                            <Card
                              hoverable
                              style={{ width: 240, marginLeft:20}}
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
                <h1 style={{marginLeft:30,color:'#1BA1E2'}}>
                    Top 5 Genres
                </h1>
                <HorizontalContainer>
                    {data.map((data)=>{
                        return (
                            <div style={{ display: 'inline-block', width: '270px' }}>
                            <Card
                              hoverable
                              style={{ width: 240, marginLeft:20}}
                              cover={<Image alt="example" src={Book} />}
                            >
                              <Meta title={data.title} description={data.Description} />
                            </Card>
                            </div>
                        );
                    })}
                 </HorizontalContainer>
             </div>
        </>
    );
}

export default Explore;