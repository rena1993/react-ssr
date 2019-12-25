import React, { useState } from 'react';
import styles from './About.css';
import WithStyle from './WithStyle';

function About(props) {
    const [count, setCount] = useState(0);
    if(props.staticContext){
        props.staticContext.css.push(styles._getCss())
    }
    return <div className={styles.title}>
        this is login page
        </div>
}

export default WithStyle(About,styles);