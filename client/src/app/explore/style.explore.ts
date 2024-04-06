import {createStyles,css} from 'antd-style';

export const useStyles = createStyles(({token,css})=>({
    contentStyle:
    css(`
        margin-top:20px;
        height: 160px;
        width:100%;
        color: #fff;
        line-height: 160px;
        text-align: center;
        background: #1BA1E2;
    `),
    heading:
    css(`
        margin-left:30px;
        color:#1BA1E2;
    `),
    card:
    css(`
        width: 240px;
        margin-left:20px;
        display:flex;
        flex-direction:column;
        justify-content:center;
    `),
    cardiv:
    css(`
        display: inline-block;
        width: 270px;
    `),
    cardCategory:css(`
        width: 250px;
        margin-left:20px;
        height:100px;
        background-color:lightblue;
        text-align:center;
    `)
}));