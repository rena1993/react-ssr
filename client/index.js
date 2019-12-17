import React from 'react';
import ReactDom from 'react-dom';
import routes from '../src/App.js';
import Header from '../src/component/Header.js';
import {BrowserRouter,Route} from 'react-router-dom';
import {getClientStore} from '../src/store/store'
import {Provider} from 'react-redux';
//zhu shui

const Page=<Provider store={getClientStore()}><BrowserRouter>
    <Header></Header>
   {routes.map(route=>{
                    return <Route {...route}></Route>
                })}
</BrowserRouter></Provider>
ReactDom.hydrate(Page,document.getElementById('root'))
