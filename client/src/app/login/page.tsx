'use client'
import React from "react";
import {Row,Col,Form,Input,Checkbox,Button, type FormProps} from 'antd';
import Image from 'next/image';
import login from '../../../public/login.png';
import { useStyles } from "./style.module";
import { useRouter } from 'next/navigation';

const Login: React.FC  = () =>{


    //styles
    const {styles}=useStyles();
    //router
    const router = useRouter();

    //customised type
    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
      };
    
    //On Submit
    const onFinish :FormProps<FieldType>["onFinish"] =(values)=>{}

    const onFinishFailed:FormProps<FieldType>["onFinishFailed"] = (error) =>{}

    return (
        <div className={styles.container}>
        <Row className={styles.content}>
            <Col className={styles.loginImageContainer}>
                <Image src={login} alt='logo pic'/>
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
                      name="username"
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

                    {/* <Form.Item<string>
                      name="remember"
                      valuePropName="checked"
                      wrapperCol={{ offset: 8, span: 16 }}
                    >
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}
                    <p className={styles.notregistered} onClick={()=> router.push('/signup')}>Not Register?</p>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type="primary" htmlType="button" >
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