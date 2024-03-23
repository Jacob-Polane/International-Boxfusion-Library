'use client'
import React from "react";
import {Row,Col,Form,Input,Checkbox,Button, type FormProps} from 'antd';
import Image from 'next/image';
import loginImage from '../../../public/login.png';
import { useStyles } from "./style.module";
import { useRouter } from 'next/navigation';
import { ILogin } from "../../../models/interface";
import { useLoginActions,useLoginState } from "@/providers/authProvider";

const Login: React.FC  = () =>{

    //auth
    const {login} = useLoginActions();
    const state =useLoginState();
    console.log(state)
    //styles
    const {styles}=useStyles();
    //router
    const router = useRouter();
    
    //On Submit
    const onFinish :FormProps<ILogin>["onFinish"] =(values:ILogin)=>{
      console.log(values)
      if(login){
        login(values);
        localStorage.setItem('name', values.userNameOrEmailAddress)
      }
    }

    const onFinishFailed:FormProps<ILogin>["onFinishFailed"] = (error) =>{}

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
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
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
                      name="remember"
                      valuePropName="checked"
                      wrapperCol={{ span: 30 }}
                    >
                      <div className={styles.RememberMeStyle}>
                        <Checkbox checked={true}>Remember me</Checkbox>
                        <p className={styles.notregistered} onClick={()=> router.push('/signup')}>Not Register?</p>
                      </div>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type="primary" htmlType="submit" >
                        Submit
                      </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        </div>
    );
}

export default Login;