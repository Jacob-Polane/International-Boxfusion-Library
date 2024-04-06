import { createStyles,css } from "antd-style";

export const useStyles=createStyles({
    scroller:
    css(`
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
    `)
});

