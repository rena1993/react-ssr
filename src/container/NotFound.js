
import React, { useState,useEffect } from 'react';
import {Route} from 'react-router-dom';

function Status({code,children}){
    return <Route render={({staticContext})=>{
        if(staticContext){
            staticContext.statusCode=code;
        }
        return children
    }}/>
}
function NotFound(props) {
    return <Status code={404}><h1>not found</h1></Status>
}

export default NotFound