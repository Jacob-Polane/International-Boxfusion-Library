import { useLoginState } from '@/providers/authProvider';
import { useSearchActionContext } from '@/providers/searchProvider';
import { Col, Drawer, Row } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import Logo from '../../../public/Logo.jpg';
import { useCheckAUth, useDrawer } from '../../../utilis/navbar/helper';
import Profile from '../profile/Profile';
import { useStyles } from "./style.module";


const NavBar : FC = ()=>{

  const router=useRouter();
  const {styles}=useStyles();
  const state=useLoginState();
  const {open,onClose,showDrawer}=useDrawer();
  const {logIn,checkLogin,logOutUser}=useCheckAUth();
  const [isLibrarian,setIsLibrarian] = useState<boolean>(false);
  const {getRecommended}=useSearchActionContext();

  useEffect(()=>{
    checkLogin();
    localStorage.getItem('isLibrarian')=='true'?setIsLibrarian(true):setIsLibrarian(false);
  },[])

  const explore=()=>{
    router.push('/explore');
  }
  
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
          onClick={explore}
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
          onClick={()=>router.push('/about')}
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
          onClick={()=>{if(logOutUser){logOutUser()}}}
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
