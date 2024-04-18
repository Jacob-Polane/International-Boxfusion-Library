'use client'
import { useInterestState } from '@/providers/InterestProvider';
import { useLoginState } from '@/providers/authProvider';
import { useBookRequestAction, useBookRequestState } from '@/providers/requestBookprovider';
import { Button, Card, Col, Modal, Row, Tag } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import Logo from '../../../public/Logo.jpg';
import { useCheckAUth } from '../../../utilis/navbar/helper';
import useProfileHelper from '../../../utilis/profile/helper';
import AuthGuard from '../authGuard/AuthGuard';
import Interests from '../interests';
import { useStyles } from './styles.module';
const Profile:FC =()=>{
    const [isLibrarian,setIsLibrarian] = useState<boolean>(false);

    const router=useRouter();
    
    const {styles} =useStyles();
    
    const {logOutUser,checkLogin}=useCheckAUth();

    const {handleCancel,handleOk,isModalOpen,showModal}=useProfileHelper();
    
    const state=useLoginState();
    const bookstate=useBookRequestState();
    const interest=useInterestState();

    
    
    const {viewHistory} = useBookRequestAction();
    
    const logout=()=>{
        logOutUser&&logOutUser();
    }

    const handleViewHistory=()=>{
        if(viewHistory){
            viewHistory();
            router.push('/history')

        }
    }


    useEffect(()=>{
        if(checkLogin){checkLogin()}
        localStorage.getItem('isLibrarian')=='true'?setIsLibrarian(true):setIsLibrarian(false);
    },[])

    return (
        <AuthGuard>
            <div className={styles.ProfileImageWrapper}>
                <Image className={styles.ProfileImage} src={Logo} alt='profile picture' width={160} height={160}/>
            </div>
            <Card hoverable className={styles.cardStyle} title='User Details'>
                    <Row style={{padding:10,marginTop:-10}}>
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
                           {state.currentUser?.email/*email address mapping*/} 
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
                    {!isLibrarian&&<><Row>
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <p style={{fontWeight:'bold',marginTop:0,marginBottom:-15}}>Interests</p>
                            <p>{interest?.Interests?.map((data)=><Tag key={data} style={{marginBottom:5}} color='gold'> {data}</Tag>)}</p>
                        </div>
                    </Row>
                    
                    <Row style={{marginTop:8,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <Button style={{backgroundColor:'#45b26b',color:'white', fontWeight:'bold'}} onClick={handleViewHistory}>View History</Button>
                        <Button style={{backgroundColor:'#1BA1E2', color:'white',fontWeight:'bold'}} onClick={showModal}>Add Interests</Button>
                    </Row></>}
                    <Modal title="Edit Interests" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Interests/>
                    </Modal>
            </Card>
            <div style={{display:'flex',justifyContent:'center'}}>
                <Button style={{backgroundColor:'red',color:'white',position:'fixed',textAlign:'center',bottom:20,width:'300px'}} onClick={logout}>Logout</Button>
            </div>   
        </AuthGuard>
    )
}

export default Profile;