'use client'
import React, { useEffect } from 'react';
import { Col, Row,Button } from 'antd';
import home from '../../public/home.jpg';
import styles from "./page.module.css";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/navbar/NavBar';
import { useCheckAUth } from '@/components/navbar/helper';

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
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, aut natus impedit incidunt explicabo velit culpa!
          Nam sit officiis repellendus illo pariatur magnam. Earum unde recusandae eos tempore, quis illo! Lorem, ipsum dolor
           sit amet consectetur adipisicing elit. Deleniti et laboriosam at alias dignissimos dolores autem maxime id ducimus 
           nesciunt quasi cum inventore nisi, eum neque voluptates natus, expedita quidem.
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
