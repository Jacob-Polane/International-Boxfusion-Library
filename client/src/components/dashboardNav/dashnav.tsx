import useDashHelper from '@/app/dashboard/helper';
import { Drawer, Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { FC, PropsWithChildren } from 'react';
import Profile from '../profile/Profile';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import AuthGuard from '../authGuard/AuthGuard';

const DashNav:FC<PropsWithChildren>=({children})=>{
    const {items,showProfile,setShowProfile}=useDashHelper();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return(
        <AuthGuard>
        <Layout style={{height:'100vh'}}>
              <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                  console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                  console.log(collapsed, type);
                }}
              >
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
                <Drawer title="Profile Details" open={showProfile} onClose={()=>setShowProfile(false)}><Profile/></Drawer>
              </Sider>
            <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}  ><h1 style={{color:'gray',marginLeft:16}}>Librarian Portal</h1></Header>
            <Content style={{ margin: '20px 16px 0'}}>
                {children}
            </Content>
            <Footer style={{ textAlign: 'center' ,padding:0}}>
              Boxfusion International Library ©{new Date().getFullYear()}
            </Footer>
          </Layout>
        </Layout>
        </AuthGuard>
    );
}

export default DashNav;