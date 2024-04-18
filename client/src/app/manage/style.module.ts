import { createStyles ,css} from "antd-style";

export const useStyles=createStyles({
    FormStyle:
    css(`
        width:100%;
        justify-content:center;
        margin-top:20px;
    `),
    VirtualistStyle:
    css(`
        border:4px solid #1BA1E2;
        padding:40px;
        min-width:1000px;
        min-height:500px;
        border-radius:4px;
        font-size:50px;
    `),
    ListItemStyle:
    css(`
        background-color:#e1eef4;
        padding:10px ! important;
        border-radius:5px;
        margin-top:5px;
    `)
})