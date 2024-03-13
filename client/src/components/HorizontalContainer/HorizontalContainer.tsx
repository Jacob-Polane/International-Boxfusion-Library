import React,{FC, ReactNode} from 'react';
import styles from './style.module.css';

interface HorizontalContainerProps{
    children:ReactNode
}

const HorizontalContainer:FC<HorizontalContainerProps> =({children})=>{
    return (
        <div className={styles.scroller}>
        {children}
    </div>
    );
}

export default HorizontalContainer;