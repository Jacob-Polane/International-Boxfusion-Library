'use client'
import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Row,
    Select
  } from 'antd';
import book from '../../../public/book.jpg';
import DashNav from '@/components/dashboardNav/dashnav';
import Image from 'next/image';
import { IBook } from '../../../models/interface';
import { useBookRequestAction } from '@/providers/requestBookprovider';

const { TextArea } = Input;

const Create:React.FC =()=>{
  const {createBook}=useBookRequestAction();
  const onFinish=(value:IBook)=>{
    if(createBook){createBook(value)}
  }
      return (
        
            <DashNav>
              <Card style={{display:'flex',flexDirection:'row'}} >
                <Row >
                  <Col style={{display:'flex',alignItems:'center',backgroundColor:'rgb(190, 230, 230)'}}>
                    <Image src={book} alt="image" width={500} height={400}/>
                  </Col>
                  <Col>
                  <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ padding:10,borderRadius:7,backgroundColor:'rgb(235, 247, 226)'}}
                    onFinish={onFinish}
                  >
                  
                    <Form.Item<IBook> 
                      label="Image Url" 
                      name='imageUrl'
                      >
                      <Input/>
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
                      <Input />
                    </Form.Item>

                    <Form.Item<IBook> 
                      label="ISBN 13" 
                      name='isbn13' 
                      rules={[{max:13,min:13,message:"ISBN 13 must be 13 characters"}]}
                      >
                      <Input />
                    </Form.Item>

                    <Form.Item<IBook> 
                      label="Publisher" 
                      name='publisher' 
                      rules={[{ required: true, message: 'Please input the publisher' }]}
                      >
                      <Input />
                    </Form.Item>

                    <Form.Item<IBook> 
                      label="Published Date" 
                      name='publishedDate'>
                      <DatePicker />
                    </Form.Item>

                    <Form.Item<IBook> 
                      label="Frequency" 
                      name='frequency'>
                      <InputNumber />
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
                        <Button  style={{width:560,backgroundColor:'#45b26b',color:'white',fontWeight:'bold'}}  htmlType='submit'>Submit</Button>
                      </Form.Item>
                  </Form>

                  </Col>
                </Row>
              
              
              
              </Card>   
            </DashNav>
        
      );
}

export default Create;