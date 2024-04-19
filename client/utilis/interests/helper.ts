import type { InputRef, SelectProps } from 'antd';
import { theme } from 'antd';
import React, { useRef, useState } from 'react';

export const useInterestHelper =()=>{

    const { token } = theme.useToken();
    const [tags, setTags] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);

    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
      };
    
      const showInput = () => {
        setInputVisible(true);
      };
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      };
    
      const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
          setTags([...tags, inputValue]);
          alert(JSON.stringify([...tags, inputValue]))
        }
        setInputVisible(false);
        setInputValue('');
      };
    
      const tagPlusStyle: React.CSSProperties = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
      };
      const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};
const options: SelectProps['options'] = [
    {
      label: 'Romance',
      value: 'Romance'
    },
    {
      label: 'Science',
      value: 'Science'
    },
    {
      label: 'History',
      value: 'History'
    },
    {
      label: 'Arts',
      value: 'Arts'
    },
    {
        label: 'Comedy',
        value: 'Comedy'
    },
    {
      label: 'Drama',
      value: 'Drama'
    },
    {
      label: 'Fiction',
      value: 'Fiction'
    },
  ];
    return {setTags,handleInputChange,handleInputConfirm,handleClose,tags,showInput,inputVisible,inputRef,inputValue,tagPlusStyle,options};
}