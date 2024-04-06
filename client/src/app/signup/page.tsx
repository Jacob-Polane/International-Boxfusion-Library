'use client'
import React from "react";
import {Row,Col,Form,Input,Button, type FormProps,Select,Space} from 'antd';
import Image from 'next/image';
import signup from '../../../public/login.png';
import {useStyles} from './style.module';
import { useRouter } from 'next/navigation';
import { IUser } from "../../../models/interface";
import { useLoginActions } from "@/providers/authProvider";

const Signup: React.FC = () => {

    const router = useRouter();
    const {styles}=useStyles();
    const {createUser} =useLoginActions();
    //custom type ... editing needed
    type FieldType = {
        name?: string;
        surname?: string;
      };
    
    //On Submit
    const onFinish :FormProps<IUser>["onFinish"] =(values:IUser)=>{
      if(createUser){
        createUser(values);
      }
    }

    const onFinishFailed:FormProps<FieldType>["onFinishFailed"] = (error) =>{}
    return (
        <div className={styles.container}>
        <Row className={styles.content}>
            <Col className={styles.signupImageContainer}>
                <Image src={signup} alt='logo pic'/>
            </Col>
            <Col className={styles.signupForm}>
                <h1 >Sign up</h1>
                <div>
                    <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: 700 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
  >                 <Form.Item label="Fullname">
                        <Space className={styles.space}>
                        <Form.Item<string>
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                            key='name'
                        >
                        <Input placeholder="name" />
                        </Form.Item>

                        <Form.Item<string>
                          name="surname"
                          rules={[{ required: true, message: 'Please input your surname!' }]}
                          key='surname'
                        >
                          <Input placeholder='surname'/>
                        </Form.Item>
                        </Space>
                    </Form.Item>
                    
                    <Form.Item
                      name="username"
                      label="username"
                      tooltip="What do you want others to call you?"
                      rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
                      style={{marginTop:-10}}
                      key='username'
                    >
                      <Input placeholder="username"/>
                    </Form.Item>

                    <Form.Item
                      name="phoneNumber"
                      label="phone number"
                      tooltip="Please enter your phone number?"
                      rules={[{ required: true, message: 'Please input your cellphone number!', whitespace: true }]}
                      style={{marginTop:-10}}
                      key='phonenumber'
                    >
                      <Input placeholder="011-011-6123"/>
                    </Form.Item>

                    <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ]}
                    key='email'
                    >
                    <Input placeholder="example@gmail.com"/>
                    </Form.Item>

                    <Form.Item
                      name="password"
                      label="Password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                      hasFeedback
                      key='password'
                    >
                      <Input.Password />
                    </Form.Item>
                  
                    <Form.Item
                      name="confirm"
                      label="Confirm Password"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                          },
                        }),
                      ]}
                      key='cpassword'
                    >
                      <Input.Password />
                    </Form.Item>
                  
                    <Form.Item
                      name="gender"
                      label="Gender"
                      rules={[{ required: true, message: 'Please select gender!' }]}
                      key='gender'
                    >
                      <Select placeholder="select your gender">
                        <Select.Option value="1">Male</Select.Option>
                        <Select.Option value="2">Female</Select.Option>
                        <Select.Option value="3">Other</Select.Option>
                      </Select>
                    </Form.Item>
                    <p className={styles.notregistered} onClick={()=> router.push('/login')}>Already Register?</p>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }} key='button'>
                      <Button type="primary" htmlType="submit">
                        Register
                      </Button>
                    </Form.Item>
                </Form>
                </div>
            </Col>
        </Row>
        </div>
    );
}

export default Signup;
