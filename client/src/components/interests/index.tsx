import { useInterestAction, useInterestState } from '@/providers/InterestProvider';
import { Select, Space } from 'antd';
import { FC, useEffect } from 'react';
import { useInterestHelper } from '../../../utilis/interests/helper';


const Interests:FC=()=>{

    const state=useInterestState();
    const {saveInterests}=useInterestAction();
    const {setTags,tags,handleClose,handleInputChange,handleInputConfirm,inputVisible,showInput,inputRef,inputValue,tagPlusStyle,options}=useInterestHelper();

    useEffect(() => {
      setTags(state.Interests?state.Interests:[]);
    }, []);

  
    const handleChange = (value: string[]) => {
        if(saveInterests){saveInterests(value)};
      };

    return(
        <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Add Category"
            onChange={handleChange}
            optionLabelProp="label"
            options={options}
            optionRender={(option) => (
                <Space>
                <span role="img" aria-label={option.data.label}>
                {option.data.label}
                </span>
              </Space>
            )}
        />
    );
}

export default Interests;