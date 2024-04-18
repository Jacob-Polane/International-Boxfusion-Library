'use client'
import NavBar from '@/components/navbar/NavBar';
import { Card, Col, Row } from 'antd';
import Image from 'next/image';
import { FC } from 'react';
import ABT from '../../../public/Abt.jpg';

const About:FC=()=>{
    
    return (
        <div>
            <NavBar/>
            <Card>
                <Row style={{display:'flex',flexDirection:'row',width:"100%",height:"100%"}}>
                    <Col style={{border:"2px solid lightblue",width:"50%",backgroundColor:'#f7fffe'}}> <Image src={ABT} alt="about us" /></Col>
                    <Col style={{width:"50%",backgroundColor:'#ebeff7',padding:30,display:'flex',flexDirection:'column',justifyContent:'center'}}>
                        <h1>Welcome</h1>
                        <p>Welcome to Boxfusion International Library, your digital gateway to a world of knowledge and inspiration. With our online library platform,
                             access thousands of books, articles, and resources right at your fingertips. Explore diverse genres, discover new authors,
                              and immerse yourself in endless learning opportunities. Whether you're a bookworm, student, or lifelong learner, our user-friendly
                               interface and extensive collection make finding and enjoying your next read a breeze. Join our community of avid readers and embark 
                               on a journey of exploration and discovery today</p>
                        <h3>Contact us</h3>
                        <p>
                            <span style={{display:'flex',flexDirection:'column'}}>
                            <span>tel : 012 012 0001</span>
                            <span>email : bil.library.ac.za</span>
                            <span>whatsApp : 067 012 0001</span>
                            <span>fax : 012 012 0001</span>
                            </span>
                        </p>
                    </Col>
                </Row>
            </Card>
           
        </div>
    );
}

export default About;