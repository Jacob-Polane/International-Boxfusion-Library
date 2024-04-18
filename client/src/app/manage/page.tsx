'use client'
import DashNav from '@/components/dashboardNav/dashnav';
import { useBookRequestAction, useBookRequestState } from '@/providers/requestBookprovider';
import { useSearchActionContext, useSearchStateContext } from '@/providers/searchProvider';
import { IBookStateContext } from '@/providers/searchProvider/context';
import { Button, Form, FormProps, Input, Modal, Select, Table, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSearchParam } from 'react-use';
import { IBook, IQuery } from '../../../models/interface';
import { useStyles } from './style.module';


const { Column } = Table;
const { confirm } = Modal;
const { Option } = Select;


const BookTable: React.FC<IBookStateContext> = () => {
  const [form] = Form.useForm();
  const status=useSearchStateContext();

  const searchTerm=useSearchParam('searchTerm');
  const [open,setOpen]=useState(false);
  const [initial,setInitial]=useState<IBook>();
  const [change,setChange]=useState<IBook>();
  const {searchBook,clearBook,getBook}=useSearchActionContext();
  const router=useRouter();
  const {styles}=useStyles();
  const {update,deleteBook}=useBookRequestAction();
 const {books}=useBookRequestState();
    
  useEffect(()=>{
    if(clearBook){clearBook()};
    if(searchTerm!==null){
      if(onFinish)
      onFinish({searchTerm:`${searchTerm}`});
    }
  },[])
  const handleCreate = (values:IBook) => {
   console.log({...change,values})
   
   if(update){
    update({...change,...values})
   }
   
   setOpen(false);
  }; 

  const handleCancel = () => {
   setOpen(false)
  };

  const handleEdit = (record:IBook) => {
   
   setInitial(record)
   setChange(record)
   setOpen(true);
   
  };
  const handleDelete = (id: string) => {
    if(deleteBook){deleteBook(id)}
    
  };
  const onFinish: FormProps<IQuery>["onFinish"] = async (values:IQuery) => {
    
    if(values.searchTerm==''){
        message.error("Please enter atleast one input")
        return;
      }
      //const query=new URLSearchParams({...values});
      //.pushState({}, '', location.pathname + '?'+'title=123')
    if(searchBook){
      await searchBook(values);  
    }
  };

  return (
    <DashNav>
        <Form layout='inline'  
        className={styles.FormStyle} 
              onFinish={onFinish}
              initialValues={{searchTerm:searchTerm!==null?searchTerm:''}}
              >
             <Form.Item <IQuery>  name="searchTerm">
              <Input  placeholder="Use keyword to search" style={{width:500}}/>
            </Form.Item>
            <Form.Item  wrapperCol={{ span: 8, offset: 0 }}>
              <Button type="primary" htmlType='submit'>Search</Button>
            </Form.Item>
          </Form>
        <Modal title="Edit Book" visible={open} onCancel={handleCancel} onOk={form.submit}>
        <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ padding:5,borderRadius:7,backgroundColor:'rgb(235, 247, 226)',maxHeight:"100%"}}
                    onFinish={handleCreate}
                    initialValues={{...initial}}
                    
                  >

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
                        <Button  style={{width:460,backgroundColor:'#45b26b',color:'white',fontWeight:'bold'}}  htmlType='submit'>Submit</Button>
                      </Form.Item>
                  </Form>
      </Modal>
        
      <Table pagination={{ pageSize: 6 }} dataSource={status.books} >
        <Column title="ISBN" dataIndex="isbn10" key="isbn" />
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Authors" dataIndex="author" key="author" />
        <Column
          title="Category"
          dataIndex="category"
          key="isbn10"
        />
        {/* <Column
          title="Action"
          key="action"
          render={(text: any, record: IBook) => (
            <Space size="middle">
              <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                
              </Button>
              <Button type="primary" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
                
              </Button>
            </Space>
          )}
        /> */}
      </Table>
      </DashNav>
  );
};

export default BookTable;