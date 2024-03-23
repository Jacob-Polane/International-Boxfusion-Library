import React,{FC, useEffect} from 'react';
import { Col, Row,Drawer } from 'antd';
import {useStyles} from "./style.module";
import Image from 'next/image';
import Logo from '../../../public/Logo.jpg'
import { useRouter } from 'next/navigation';
import { useDrawer,useCheckAUth } from './helper';
import Profile from '../profile/Profile';
import { useLoginState } from '@/providers/authProvider';
const NavBar : FC = ()=>{

  const router=useRouter();
  const {styles}=useStyles();
  const state=useLoginState();
  const {open,onClose,showDrawer}=useDrawer();
  const {logIn,checkLogin,logOutUser}=useCheckAUth();
  
  useEffect(()=>{
    checkLogin();
  })

  
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
        {logIn&&<Col
          className={styles.nav}
          key='logout'
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '40%' }}
          lg={{ flex: '20%' }}
          xl={{ flex: '15%' }}
          onClick={()=>{if(logOutUser){logOutUser()}}}
        >

          Logout
        </Col>}
        {open?
          <Drawer title="Profile Details" onClose={onClose} open={open}>
            <Profile/>
          </Drawer>
          :
          logIn&&<Col className={styles.navUser} onClick={showDrawer}>{state.currentUser?.name}</Col>
        }
    </Row>
    );
}

export default NavBar;
