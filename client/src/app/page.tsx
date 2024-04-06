'use client'
import React, { useEffect } from 'react';
import { Col, Row,Button } from 'antd';
import home from '../../public/home.jpg';
import styles from "./page.module.css";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/navbar/NavBar';
import { useCheckAUth } from '../../utilis/navbar/helper';

export default function Home() {
  //useState
  const {logIn,checkLogin} =useCheckAUth();
  //router
  const router = useRouter()
  useEffect(()=>{
   checkLogin();
  })
  
  return (
  
  <>
    <NavBar/>
    <Row>
      <Col 
        className={styles.homeMessage}
        span={12}>
        <h1 className={styles.homeMessageh1}>Welcome to BIL</h1>
        <p className={styles.homeMessageParagraph} >
        Discover the unparalleled convenience and efficiency of our book retrieval library! Our library stands out as the pinnacle of book acquisition,
         offering unparalleled access to a vast array of literary treasures. With its meticulously curated collection and state-of-the-art search capabilities,
          finding the perfect book has never been easier. Whether you're seeking a timeless classic or the latest bestseller, our library boasts an extensive 
          catalog to cater to every taste and interest. What sets us apart is our commitment to user experience – our intuitive interface ensures seamless navigation 
          and swift retrieval, saving you precious time and effort. Say goodbye to endless browsing and frustrating searches; with our library, the perfect book is just a click away.
           Experience the epitome of book acquisition efficiency with our unparalleled library – because when it comes to getting books, accept no substitutes.
        </p>
        {!logIn&&<Button className={styles.loginButton}onClick={()=> router.push('/login')} >Login</Button>}
      </Col>
      <Col span={12}>
        <Image className={styles.homeImage} src={home} alt=''/>
      </Col>
    </Row>
  </>
  );
}
