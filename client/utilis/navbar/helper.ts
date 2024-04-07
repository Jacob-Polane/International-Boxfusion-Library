import { useState } from "react";
import { useLoginState,useLoginActions } from "@/providers/authProvider";
import  useLocalStorage  from "@/hooks";


export const useDrawer=()=>{
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
      };
    
      const onClose = () => {
        setOpen(false);
      };
    return {open,showDrawer,onClose}
}

export const useCheckAUth=()=>{
    const {logOutUser,getUserDetails} =useLoginActions();
    const state=useLoginState();
    const {storedValue:local,setValue:setLocal}=useLocalStorage("token","")
    const [logIn,setLogIn]=useState<boolean>(false);
    const checkLogin = ()=>{
        if(!state.currentUser){
            if(local){
                if(getUserDetails){
                    getUserDetails();
                    setLogIn(()=>true)
                }else{
                    setLogIn(()=>false);
                }
            }else{
                setLogIn(()=>false);
            }
        }else{
            setLogIn(()=>true)
        }
    }
    return{logIn,checkLogin,logOutUser,getUserDetails};
}