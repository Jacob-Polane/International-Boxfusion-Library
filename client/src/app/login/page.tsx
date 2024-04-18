'use client'
import { useLoginActions, useLoginState } from "@/providers/authProvider";
import { Button, Checkbox, Col, Form, Input, Row, Switch, type FormProps } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { ILogin } from "../../../models/interface";
import loginImage from '../../../public/login.png';
import { useStyles } from "./style.module";

const Login: React.FC  = () =>{
    const [isSubmitted, setIsSubmitted] = useState(false);
    //auth
    const {login} = useLoginActions();
    const state =useLoginState();
    //styles
    const {styles}=useStyles();
    //router
    const router = useRouter();
    
    //On Submit
    const onFinish :FormProps<ILogin>["onFinish"] =(values:ILogin)=>{
      if (isSubmitted) {
        return;
      }
  
      if(login){
        login(values);
        values.isLibrarian?localStorage.setItem('isLibrarian','true'):localStorage.setItem('isLibrarian','false')
        
        localStorage.setItem('name', values.userNameOrEmailAddress)
      }
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 10000);
    }

    const onFinishFailed:FormProps<ILogin>["onFinishFailed"] = (error) =>{}
    const [form] = Form.useForm();
    return (
        <div className={styles.container}>
        
        <Row className={styles.content}>
            <Col className={styles.loginImageContainer} key='navkey'>
                <Image src={loginImage} alt='logo pic'/>
            </Col>
            <Col className={styles.loginForm}>
                    <h1 className={styles.loginFormH1}>
                        Hi,<br/>Welcome back 
                    </h1>

                    <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ isLibrarian:false,remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    >     
                           
                    <Form.Item<string>
                      label="Username"
                      name="userNameOrEmailAddress"
                      rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item<string>
                      label="Password"
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item<string>
                      name="isLibrarian"
                      valuePropName="checked"
                    >
                      <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'300px',justifyContent:'center'}}>
                        <p>Are you a librarian</p>
                        <Switch style={{marginLeft:20}} checkedChildren="Yes" unCheckedChildren="No" onChange={(checked) => form.setFieldsValue({ isLibrarian: checked })}/>
                      </div>
                    </Form.Item>

                    <Form.Item<string>
                      name="remember"
                      valuePropName="checked"
                      wrapperCol={{ span: 30 }}
                    >
                      <div className={styles.RememberMeStyle}>
                        <Checkbox defaultChecked={true}>Remember me</Checkbox>
                        <p className={styles.notregistered} onClick={()=> router.push('/signup')}>Not Register?</p>
                      </div>
                    </Form.Item>
                    
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type="primary" htmlType="submit" >
                        {isSubmitted ? 'Submitting...' : 'Submit'}
                      </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        </div>
    );
}

export default Login;