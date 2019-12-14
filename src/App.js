import React, { useState } from 'react';
import {Route} from 'react-router-dom';
import About from './container/About';
import Index from './container/Index';

export default(
    <div>
        <Route path="/" exact component={Index}></Route>
        <Route path="/about" exact component={About}></Route>
    </div>
)