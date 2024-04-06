import { createStyles,css } from "antd-style";

export const useStyles = createStyles(({css})=>({
    BookContainer:
    css(`
        display:flex;
        justify-content:center;
        align-items:center;

       
        height:100vh;
        scroll:none;
        overflow: hidden;
    `),
    BookCard:
    css(`
        width:70%;
        border-color:#1BA1E2;
        
    `),
    Authors:
    css(`
        margin-left: 2%;
    `),
    buttonSelect:
    css(`
        display:flex;
        flex-direction:column;

        width:300px;
        margin-left:20px;
    `),
    button:
    css(`
        margin-top:20px;
    `)
}))