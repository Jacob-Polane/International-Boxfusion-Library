import { useCheckAUth } from '../navbar/helper';
import React, { useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useBookRequestAction } from '@/providers/requestBookprovider';

const useDashHelper=()=>{
    const router=useRouter();
    const {logOutUser} =useCheckAUth();
    const [showProfile,setShowProfile]=useState<boolean>(false);
    const {viewAllRequest}=useBookRequestAction();
    enum functionType{
        User='User',
        Dashboard='Dashboard',
        Books='Add Book',
        Logout='Logout'
    }
    const functions={
        [functionType.User]:()=>{setShowProfile(true)},
        [functionType.Dashboard]:()=>{router.push('/dashboard')},
        [functionType.Logout]:()=>{if(logOutUser){logOutUser()}},
        [functionType.Books]:()=>{router.push('/createbook')}
    }

    const DashOperations={
      'All':()=>{
                  router.push('/request')
                  if(viewAllRequest){viewAllRequest('')}
                },
      'Pending':()=>{
                      router.push('/request')
                      if(viewAllRequest){viewAllRequest('1')}
                    },
      'Ready':()=>{
                    router.push('/request')
                    if(viewAllRequest){viewAllRequest('2')}
                  },
      'Collected':()=>{
                    router.push('/request')
                    if(viewAllRequest){viewAllRequest('3')}
                  },
      'Returned':()=>{
                      router.push('/request')
                      if(viewAllRequest){viewAllRequest('4')}
                    }
  }
    const labels:functionType[]=[functionType.User,functionType.Dashboard,functionType.Books,functionType.Logout]
    const items = [UserOutlined, VideoCameraOutlined, UploadOutlined,UserOutlined].map(
      (icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon),
        label: labels[index],
        onClick:functions[labels[index]]
      }),
    );
    return {items,setShowProfile,showProfile,DashOperations};
    }

    export default useDashHelper;
