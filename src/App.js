import React, { useState } from 'react';
import {Route} from 'react-router-dom';
import About from './container/About';
import User from './container/User';
import Index from './container/Index';

// export default(
//     <div>
//         <Route path="/" exact component={Index}></Route>
//         <Route path="/about" exact component={About}></Route>
//     </div>
// )



export default[
    {path:'/',exact:true,component:Index,key:'index'},
    {path:'/about',component:About,exact:true,key:'about'},
    {path:'/user',component:User,key:'user'}
]