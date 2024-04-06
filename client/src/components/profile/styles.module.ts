import {createStyles,css} from 'antd-style';

export const useStyles=createStyles({
    ProfileImageWrapper:css(`
        display:flex;
        justify-content:center;
    `),
    ProfileImage:css(`
        border:3px solid #45b26b;
        border-radius:50%;
    `),
    cardStyle:css(`
        width:100%;
        border:1px solid #1BA1E2;
        margin-top:30px;
        height:360px;
    `)
})