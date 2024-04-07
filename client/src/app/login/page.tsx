'use client'
import React from "react";
import {Row,Col,Form,Input,Checkbox,Button, type FormProps,Switch, message} from 'antd';
import Image from 'next/image';
import loginImage from '../../../public/login.png';
import { useStyles } from "./style.module";
import { useRouter } from 'next/navigation';
import { ILogin} from "../../../models/interface";
import { useLoginActions} from "@/providers/authProvider";
import  useLocalStorage  from "@/hooks";


const Login: React.FC  = () =>{

    //auth
    const {login} = useLoginActions();
    const{setValue:setRole}=useLocalStorage("isLibrarian","");
    const {setValue:setName}=useLocalStorage("name","");
    //styles
    const {styles}=useStyles();
    //router
    const router = useRouter();
    
    //On Submit
    const onFinish :FormProps<ILogin>["onFinish"] =(values:ILogin)=>{

      if(login){
        login(values);
        values.isLibrarian?setRole("true"):setRole("false");
        
        setName(values.userNameOrEmailAddress);
      }
    }

    const onFinishFailed:FormProps<ILogin>["onFinishFailed"] = (error) =>{
      console.log(error)
      message.error("failed")
    }
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