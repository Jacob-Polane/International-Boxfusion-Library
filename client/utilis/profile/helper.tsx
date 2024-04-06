import React,{useState} from 'react';


const useProfileHelper =()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

      return {handleCancel,handleOk,showModal,isModalOpen};
}

export default useProfileHelper;