'use client'
import React,{FC, useEffect, useState} from 'react';
import { Col, Row,Drawer } from 'antd';
import {useStyles} from "./style.module";
import Image from 'next/image';
import Logo from '../../../public/Logo.jpg'
import { useRouter } from 'next/navigation';
import { useDrawer,useCheckAUth } from '../../../utilis/navbar/helper';
import Profile from '../profile/Profile';
import { useLoginState } from '@/providers/authProvider';
import { useInterestAction } from '@/providers/InterestProvider';
import { useLocalStorage } from 'react-use';
import { useCommentAction } from '@/providers/commentProvider';
import { useSearchActionContext } from '@/providers/searchProvider';
import { useBookRequestAction } from '@/providers/requestBookprovider';


const NavBar : FC = ()=>{

  const router=useRouter();
  const {styles}=useStyles();
  const state=useLoginState();
  const {open,onClose,showDrawer}=useDrawer();
  const {logIn,checkLogin,logOutUser}=useCheckAUth();
  const [isLibrarian,setIsLibrarian] = useState<boolean>(false);
  const action=useInterestAction();
  const [role]=useLocalStorage("isLibrarian","");

  const {clearComments}=useCommentAction();
  const {clearBook}=useSearchActionContext();
  const {viewHistory,clearRequest} = useBookRequestAction();
  const {trendingBooks,getBookTrending,getRecommended}=useSearchActionContext();

  useEffect(()=>{
    checkLogin();
    role=='true'?setIsLibrarian(true):setIsLibrarian(false);
    if(action.getInterests){action.getInterests()};
    if(trendingBooks){trendingBooks()}
    if(getRecommended){getRecommended()}
  },[])

  
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

        {!isLibrarian?<><Col
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
        </Col></>:
          <Col
          className={styles.nav}
          key='about'
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '40%' }}
          lg={{ flex: '20%' }}
          xl={{ flex: '15%' }}
          onClick={()=>router.push('/dashboard')}
        >

          Dashboard
        </Col>
        }
        {logIn&&<Col
          className={styles.nav}
          key='logout'
          xs={{ flex: '100%' }}
          sm={{ flex: '50%' }}
          md={{ flex: '40%' }}
          lg={{ flex: '20%' }}
          xl={{ flex: '15%' }}
          onClick={()=>{
            clearBook&&clearBook();
            clearComments&&clearComments();
            clearRequest&&clearRequest();
            if(logOutUser){logOutUser()}}}
        >

          Logout
        </Col>}
        {open?
          <Drawer title="Profile Details" onClose={onClose} open={open}>
            <Profile/>
          </Drawer>
          :
          logIn&&<Col className={styles.navUser} onClick={showDrawer}>{state.currentUser?.username}</Col>
        }
    </Row>
    );
}

export default NavBar;
