import React,{FC, ReactNode} from 'react';
import {useStyles} from './style.module';

interface HorizontalContainerProps{
    children:ReactNode
}

const HorizontalContainer:FC<HorizontalContainerProps> =({children})=>{
    const {styles}=useStyles();
    return (
        <div className={styles.scroller}>
        {children}
    </div>
    );
}

export default HorizontalContainer;