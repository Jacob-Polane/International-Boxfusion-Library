import React,{FC, useEffect} from 'react';
import Image from 'next/image';
import Logo from '../../../public/Logo.jpg'
import { useStyles } from './styles.module';
import {Card,Row,Col,Tag,Button} from 'antd';
import AuthGuard from '../authGuard/AuthGuard';
import { useCheckAUth } from '../navbar/helper';
import { useLoginState } from '@/providers/authProvider';
import { useRouter } from 'next/navigation';
const Profile:FC =()=>{
    const router=useRouter();
    const {styles} =useStyles();
    const {logIn,logOutUser,checkLogin}=useCheckAUth();
    const state=useLoginState();
    const logout=()=>{
        logOutUser&&logOutUser();
        router.push('/');
    }
    useEffect(()=>{
        checkLogin()
        console.log(state.currentUser)
    },[])
    return (
        <AuthGuard>
            <div className={styles.ProfileImageWrapper}>
                <Image className={styles.ProfileImage} src={Logo} alt='profile picture' width={160} height={160}/>
            </div>
            <Card hoverable className={styles.cardStyle} title='User Details'>
                    <Row style={{padding:10}}>
                        <Col span={12}>
                            First Name
                        </Col>
                        <Col span={12}>
                            Last Name
                        </Col>
                    </Row>
                    <Row style={{padding:10}}>
                        <Col span={12}>
                            {state.currentUser?.name}
                        </Col>
                        <Col span={12}>
                        {state.currentUser?.surname}
                        </Col>
                    </Row>
                    <Row style={{padding:10}}>
                        <Col span={12}>
                            Email Address:
                        </Col>
                        <Col span={12}>
                           {state.currentUser?.emailAddress/*email address mapping*/} 
                        </Col>
                    </Row>
                    <Row style={{padding:10}}>
                        <Col span={12}>
                            Phone Number:
                        </Col>
                        <Col span={12}>
                           {state.currentUser?.phoneNumber}
                        </Col>
                    </Row>
                    <Row>
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <p style={{fontWeight:'bold',marginBottom:-10}}>Interests</p>
                            <p><Tag color='gold'> Comedy</Tag><Tag color='gold'>Drama</Tag><Tag color='gold'>Sci-Fi</Tag></p>
                        </div>
                    </Row>
                    <hr />
                    <Row style={{marginTop:8,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <Button style={{backgroundColor:'#45b26b',color:'white', fontWeight:'bold'}}>View History</Button>
                        <Button style={{backgroundColor:'#1BA1E2', color:'white',fontWeight:'bold'}}>Add Interests</Button>
                    </Row>
            </Card>
            <div style={{display:'flex',justifyContent:'center'}}>
                <Button style={{backgroundColor:'red',color:'white',position:'fixed',textAlign:'center',bottom:20,width:'300px'}} onClick={logout}>Logout</Button>
            </div>   
        </AuthGuard>
    )
}

export default Profile;