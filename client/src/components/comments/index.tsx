'use client'
import { useCommentAction, useCommentState } from '@/providers/commentProvider';
import { Button, Card, Drawer, Flex, Form, FormProps, Modal, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { ReactNode } from 'react';
import { CommentData } from '../../../models/interface';

export interface params{
    children?:ReactNode;
    setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen?:boolean;
    id:string;
}

export interface params_drawer{
    children?:ReactNode;
    setDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    isDrawerOpen?:boolean;
    id:string;
}
export const Comment: React.FC<params> = ({ setIsModalOpen, isModalOpen, children ,id}) => {

    
    const {createComment}=useCommentAction();
    const [form]=Form.useForm();
    
    const onFinish: FormProps<CommentData>["onFinish"] = (values) => {
        
        values.rating=values.rating==undefined?0:values.rating;
        console.log('Success:', values);
        if(createComment)createComment(values,id)
        form.resetFields();
        if(setIsModalOpen)setIsModalOpen(false);
      };

      const onFinishFailed: FormProps<CommentData>["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  return (
      <Modal title="Review Book" open={isModalOpen} onCancel={()=>{if(setIsModalOpen)setIsModalOpen(false)}} footer={null} >
        <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width:'700px' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        
        >
        <Flex vertical gap={10}>
            <Form.Item
                name='Message'
            >
            <TextArea
              showCount
              maxLength={100}
              placeholder="Type your review here"
              style={{ height: 120, resize: 'none' }}
            />
            </Form.Item>
           
           <Form.Item
            name='rating'
            >
            <Rate defaultValue={0}/>
           </Form.Item>
           <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Flex>
        </Form>
      </Modal>
  );
};

export const ViewComment : React.FC<params_drawer> = ({children,setDrawerOpen,isDrawerOpen})=>{
    const state=useCommentState();
    return (
    <div>
        <Drawer title='Reviews' open={isDrawerOpen} onClose={()=>{if(setDrawerOpen)setDrawerOpen(false)}}>
        { state?.comments?.map((data)=>
        <Card key={data.message} bordered={true} style={{ width: 300 ,border:'2px solid #1BA1E2',marginTop:10,display:'flex',flexDirection:'column'}}>
          <p >{data?.message}</p>
          <Rate disabled defaultValue={data?.rating} />
        </Card>)}
        </Drawer>
    </div>);
};

