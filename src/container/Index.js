import React, { useState,useEffect } from 'react';
import {getIndexList} from '../store/index';
import{connect} from 'react-redux';
import WithStyle from './WithStyle';

import styles from './Index.css';
function Index(props) {
    const [count, setCount] = useState(0);
    useEffect(()=>{
        if(props.list.length==0){
            props.getIndexList()
        }
        
    },[])
    // if(props.staticContext){
    //     props.staticContext.css.push(styles._getCss())
    // }
    return <div className={styles.bk}>
        <h1>{props.greeting} kaike {count}</h1>
        <button onClick={() => { setCount(prev => prev + 1) }}>increase</button>
        <ul>
            {props.list.map(item=>{
                return <li key={item.id}>{item.name}</li>
            })}
        </ul>
        </div>
}
Index.loadData=(store)=>{
    return store.dispatch(getIndexList())
}
export default connect(state=>{
    console.log(state);
        return {list:state.index.list}
    },{getIndexList})(WithStyle(Index,styles))