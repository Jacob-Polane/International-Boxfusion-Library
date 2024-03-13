import React,{FC} from 'react';
import { Col, Row,Button } from 'antd';
import {useStyles} from "./style.module";
import Image from 'next/image';
import Logo from '../../../public/Logo.jpg'
import { useRouter } from 'next/navigation';
import menu from '../../../public/menu.png'

const NavBar : FC = ()=>{
  const router=useRouter();
  const {styles}=useStyles();
    return (
        <Row className={styles.row}>
        <Col 
          className={styles.logo}
          key='logo'
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '40%' }}
          lg={{ flex: '20%' }}
          xl={{ flex: '15%' }}>

         <Image className={styles.logoImage} src={Logo} alt='logo' onClick={()=> router.push('/')}/>
        </Col>

        <Col
          className={styles.nav}
          key='explore'
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '40%' }}
          lg={{ flex: '20%' }}
          xl={{ flex: '15%' }}
          onClick={()=> router.push('/explore')}
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
          onClick={()=> router.push('/search')}
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
    );
}

export default NavBar;