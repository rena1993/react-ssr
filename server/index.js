import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import express from 'express';
import App from '../src/App.js';
import {Provider} from 'react-redux';
import store from '../src/store/store'

const app=express();
app.use(express.static('public'));
app.get('*',(req,res)=>{
    const content=renderToString(
        <Provider store={store}>
        <StaticRouter location={req.url}>
            {App}
        </StaticRouter>
        </Provider>
    );
    res.send(`<html>
    <head><meta charset="utf-8"><title>react ssr</title></head
    <body>
    <div id="root">${content}</div></body>
    <script src="/bundle.js"></script>
    </html>`)
})

app.listen('9093',()=>{
    console.log('success')
})