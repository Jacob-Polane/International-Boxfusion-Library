import { createStyles ,css} from "antd-style";

export const useStyles=createStyles({
    container:css(`
        height: 100vh;
        width: 100%;
        background-color: rgb(255, 255, 255);
        
        display:flex;
        align-items: center;
        justify-content: center;
    `),

    content:css(`
        border-radius: 6px;
    
        width:90%;
        height:80vh;
    `),

    signupImageContainer:css(`
        background-color: rgb(190, 230, 230);
        
        width: 50%;
    `),
    
    signupForm:css(`
        background-color: rgb(236, 251, 237);
    
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `),
    
    space:css(`
        padding : 0 !important;
        margin:0 !important;
        margin-bottom: -10px !important;
    `),
    
    notregistered:css(`
        color:blue;
        text-align:right;
    
    &:hover{
        cursor: pointer;
        color: blue;
    }`)
})


