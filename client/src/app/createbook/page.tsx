'use client'
import DashNav from '@/components/dashboardNav/dashnav';
import { useBookRequestAction } from '@/providers/requestBookprovider';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Upload
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import Image from 'next/image';
import React from 'react';
import { IBook } from '../../../models/interface';
import book from '../../../public/book.jpg';

const { TextArea } = Input;

const Create:React.FC =()=>{
  const [form] = useForm();
  const {createBook}=useBookRequestAction();
  const onFinish=(value:IBook)=>{
    console.log({...value,fileData:value.imageUrl.file.originFileObj,frequency:0
      })

      form.resetFields();
    if(createBook){createBook({...value,fileData:value.imageUrl.file.originFileObj,frequency:0
    })}
  }
      return (
        
            <DashNav>
              <Card style={{display:'flex',flexDirection:'row'}} >
                <Row >
                  <Col style={{display:'flex',alignItems:'center',backgroundColor:'rgb(190, 230, 230)',width:'50%'}}>
                    <Image src={book} alt="image" />
                  </Col>
                  <Col>
                  <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ padding:5,borderRadius:7,backgroundColor:'rgb(235, 247, 226)',maxHeight:"100%"}}
                    onFinish={onFinish}
                  >
                  
                    <Form.Item<IBook> 
                      label="Upload Image:" 
                      name='imageUrl'
                      
                      >
                      <Upload style={{marginLeft:10}}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                      </Upload>
                    </Form.Item>

                    <Form.Item<IBook>
                      label="Title" 
                      name='title' 
                      rules={[{ required: true, message: 'Please input the title' }]}
                      >
                      <Input />
                    </Form.Item>

                    <Form.Item<IBook> 
                      label="Author" 
                      name='author' 
                      rules={[{ required: true, message: 'Please input the author' }]}
                      >
                      <Input placeholder='Enter author name e.g. A.J. Unknown'/>
                    </Form.Item>

                    <Form.Item<IBook> 
                      label="Description" 
                      name='description'
                      >
                      <TextArea/>
                    </Form.Item>
                 
                    <Form.Item<IBook>
                      label="ISBN 10" 
                      name='isbn10' 
                      rules={[{max:10,min:10,message:"ISBN 10 must be 10 characters"}]}
                      >
                      <Input style={{marginLeft:10}}/>
                    </Form.Item>

                    <Form.Item<IBook> 
                      label="ISBN 13" 
                      name='isbn13' 
                      rules={[{max:13,min:13,message:"ISBN 13 must be 13 characters"}]}
                      >
                      <Input  />
                    </Form.Item>
                  
                    <Form.Item<IBook> 
                      label="Publisher" 
                      name='publisher' 
                      rules={[{ required: true, message: 'Please input the publisher' }]}
                      >
                      <Input />
                    </Form.Item>

                    <Form.Item<IBook> 
                      label="Date" 
                      name='publishedDate'>
                      <DatePicker />
                    </Form.Item>

                    <Form.Item<IBook> label="Category" name='category' rules={[{ required: true, message: 'Please select the category' }]}>
                      <Select>
                        <Select.Option value="Romance">Romance</Select.Option>
                        <Select.Option value="Drama">Drama</Select.Option>
                        <Select.Option value="Comedy">Comedy</Select.Option>
                        <Select.Option value="Arts">Arts</Select.Option>
                        <Select.Option value="History">History</Select.Option>
                        <Select.Option value="Science">Science</Select.Option>
                      </Select>
                      </Form.Item>

                      <Form.Item>
                        <Button  style={{width:530,backgroundColor:'#45b26b',color:'white',fontWeight:'bold'}}  htmlType='submit'>Submit</Button>
                      </Form.Item>
                  </Form>
                  </Col>
                </Row>
              </Card>   
            </DashNav>
        
      );
}

export default Create;