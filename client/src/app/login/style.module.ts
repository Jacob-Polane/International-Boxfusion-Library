import { createStyles,css } from "antd-style";

export const useStyles = createStyles(()=>({
    container:
    css(`
        height: 100vh;
        background-color: rgb(235, 247, 226);

        display:flex;
        align-items: center;
        justify-content: center;
    `),
    content:css(`
        border-radius: 6px;

        width:90%;
        height:80vh;
    `),
    loginImageContainer:css(`
        background-color: rgb(190, 230, 230);

        width: 50%;
    `),
    loginForm:css(`
        background-color: rgb(255, 255, 255);
    
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `),
    loginFormH1:css(`
        margin-top:-30px;
    `),
    notregistered:css(`
        margin-left:30px;
        &:hover{
            cursor: pointer;
            color: blue;
            
        }
    `),
    RememberMeStyle:
    css(`
        display:flex;
        flex-direction:row;
        width:100%;
        align-items:center;
    `)
}));