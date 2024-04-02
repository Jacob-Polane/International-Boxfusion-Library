'use client'
import React from 'react';
import {Col,Row} from 'antd';
import DashNav from '@/components/dashboardNav/dashnav';
import useDashHelper from './helper';

const Dashboard: React.FC = () => {
    const {DashOperations}=useDashHelper();
    return (
        <DashNav>
          <Row gutter={[40, 32]}>
              <Col span={12}><div style={{backgroundColor:'#1BA1E2',height:100,color:'white',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5}} onClick={DashOperations.All}><h1>All Requests</h1></div></Col>
              <Col span={12}><div style={{backgroundColor:'#1BA1E2',height:100,color:'white',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5}} onClick={DashOperations.Pending}><h1>Pending</h1></div></Col>
              <Col span={12}><div style={{backgroundColor:'#1BA1E2',height:100,color:'white',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5}} onClick={DashOperations.Ready}><h1>Ready to Collect</h1></div></Col>
              <Col span={12}><div style={{backgroundColor:'#1BA1E2',height:100,color:'white',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5}} onClick={DashOperations.Collected}><h1>Collected</h1></div></Col>
              <Col span={12}><div style={{backgroundColor:'#1BA1E2',height:100,color:'white',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5}} onClick={DashOperations.Returned}><h1>Returned</h1></div></Col>
          </Row>
        </DashNav>
      );

  
};

export default Dashboard;