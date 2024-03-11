'use client'
import React from 'react';
import { Col, Row,Button } from 'antd';
import menu from '../../public/menu.png';
import home from '../../public/home.jpg';
import styles from "./page.module.css";
import Image from 'next/image';
import Logo from '../../public/Logo.jpg'
import { useRouter } from 'next/navigation';

export default function Home() {
  //router
  const router = useRouter()
  
  return (
  
  <>
    <Row className={styles.row}>
        <Col 
          className={styles.logo}
          key='logo'
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '40%' }}
          lg={{ flex: '20%' }}
          xl={{ flex: '15%' }}>

         <Image className={styles.logoImage} src={Logo} alt='logo'/>
        </Col>

        <Col
          className={styles.nav}
          key='explore'
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '40%' }}
          lg={{ flex: '20%' }}
          xl={{ flex: '15%' }}
        >

          Explore
        </Col>

        <Col
          className={styles.nav}
          key='search'
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '40%' }}
          lg={{ flex: '20%' }}
          xl={{ flex: '15%' }}
        >

          Search
        </Col>

        
        <Col
          className={styles.nav}
          key='about'
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '40%' }}
          lg={{ flex: '20%' }}
          xl={{ flex: '15%' }}
        >

          About
        </Col>
        <Image  className={styles.menu} src={menu} alt='menu'/> 
    </Row>

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
        <Button className={styles.loginButton}onClick={()=> router.push('/login')} >Login</Button>
      </Col>
      <Col span={12}>
        <Image className={styles.homeImage} src={home} alt=''/>
      </Col>
    </Row>
  </>
  );
}
