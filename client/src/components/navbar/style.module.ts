import {createStyles} from 'antd-style';

export const useStyles=createStyles(({token,css})=>({
  row:
  css(`
    margin-top:30px;
  `),

  logo:
  css(`
    margin-right:200px;
  `),

  logoImage:
  css(`
    width: 60px;
    height: 60px;
  
    border-radius: 50%;
    border: 2px solid #45b26b;
    margin-top:-10px;
    margin-left:30px;

    &:hover{}
      cursor: pointer;
    }
  `),

  nav:
  css(`
    font-size: 18px;
    font-weight: bold;
    color: #1BA1E2;

  &:hover{
    cursor: pointer;
  }`),

  menu:
  css(`
    width:40px;
    height: 30px;
    
    position: fixed;
    right:50px;
  `)

}))
