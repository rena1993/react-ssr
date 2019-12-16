import React, { useState,useEffect } from 'react';
import {getIndexList} from '../store/index';
import{connect} from 'react-redux';

function Index(props) {
    const [count, setCount] = useState(0);
    useEffect(()=>{
        if(props.list.length==0){
            props.getIndexList()
        }
        
    },[])
    return <div>
        <h1>{props.greeting} kaikeba {count}</h1>
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
    },{getIndexList})(Index)