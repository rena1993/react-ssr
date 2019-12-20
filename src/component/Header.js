import React from 'react';
import {Link} from 'react-router-dom';

export default()=>{
    return <div>
        <Link to="/">home link</Link>|
        <Link to="/about">about link</Link>|
        <Link to="/user">user link</Link>|
        <Link to="/notexist">not exist</Link>
    </div>
}