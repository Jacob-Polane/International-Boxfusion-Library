import { useBookRequestAction } from '@/providers/requestBookprovider';
import { EditOutlined, LogoutOutlined, PlusCircleOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useCheckAUth } from '../navbar/helper';

const useDashHelper=()=>{
    const router=useRouter();
    const {logOutUser} =useCheckAUth();
    const [showProfile,setShowProfile]=useState<boolean>(false);
    const {viewAllRequest}=useBookRequestAction();
    enum functionType{
        User='User',
        Dashboard='Dashboard',
        Create='Create Book',
        Books='Manage Books',
        Logout='Logout'
    }

    const functions={
        [functionType.User]:()=>{setShowProfile(true)},
        [functionType.Dashboard]:()=>{router.push('/dashboard')},
        [functionType.Logout]:()=>{if(logOutUser){logOutUser()}},
        [functionType.Create]:()=>{router.push('/createbook')},
        [functionType.Books]:()=>{router.push('/manage')}
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
    const labels:functionType[]=[functionType.User,functionType.Dashboard,functionType.Create,functionType.Books,functionType.Logout]
    const items = [UserOutlined, VideoCameraOutlined, PlusCircleOutlined,EditOutlined,LogoutOutlined].map(
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
