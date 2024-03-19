'use client'
import React,{FC,useState,useEffect}from 'react';
import {Form,type FormProps,Button,Input,List,message,Avatar} from 'antd';
import VirtualList from 'rc-virtual-list';
import NavBar from '@/components/navbar/NavBar';
import AuthGuard from '@/components/authGuard/AuthGuard';

type FieldType = {
  isbn?: string;
  title?: string;
  author?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log('Success:', values);
};
interface UserItem {
  email: string;
  gender: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
  const ContainerHeight = 500;

const Search: FC =()=>{
  const [data, setData] = useState<UserItem[]>([]);

  const appendData = () => {
  fetch('https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        console.log(data,'data to be recieved');
        message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
      appendData();
    }
  };

    return(
  <AuthGuard>
      <div >
         <NavBar/>
          <Form layout='inline'  style={{width:'100%',justifyContent:'center',marginTop:'20px'}} onFinish={onFinish}>
             <Form.Item <FieldType> label="ISBN" name="isbn">
              <Input  placeholder="Search by ISBN" style={{width:200}}/>
            </Form.Item>
            <Form.Item <FieldType> label="Title" name="title">
              <Input  placeholder="Search by title" style={{width:200}} />
            </Form.Item>
            <Form.Item <FieldType> label="Author" name="author">
              <Input placeholder="Search by Author" style={{width:200}} />
            </Form.Item>
            <Form.Item  wrapperCol={{ span: 8, offset: 0 }}>
              <Button type="primary" htmlType='submit'>Search</Button>
            </Form.Item>
          </Form>
          <List style={{width:'100%',alignItems:'center',padding:20,display:'flex',justifyContent:'center',}}>
            <h1 style={{color:'#1BA1E2'}}>Results:</h1>
            <VirtualList
              data={data}
              height={ContainerHeight}
              itemHeight={60}
              itemKey="email"
              onScroll={onScroll}
              style={{border:'4px solid #1BA1E2',padding:40,minWidth:1000,minHeight:500,borderRadius:4}}
            >
              {(item: UserItem) => (
                <List.Item key={item.email}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture.large} />}
                    title={<a href="https://ant.design">{item.name.last}</a>}
                    description={item.email}
                  />
                </List.Item>
              )}
            </VirtualList>
        </List>
      </div>
      </AuthGuard>
    );
}

export default Search;