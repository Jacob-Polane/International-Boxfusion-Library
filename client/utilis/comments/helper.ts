import React, { useState } from 'react';
import { Button, Flex, Form, FormProps, Modal, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
type FieldType ={
    Message?:string;
    rating?:number;
}
export const useCommentHelper =()=>{
    const [isModalOpen, setIsModalOpen] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return {handleCancel,showModal,isModalOpen,onFinish,onFinishFailed,handleOk};
}