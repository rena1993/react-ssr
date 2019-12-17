import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter,matchPath,Route} from 'react-router-dom';
import express from 'express';
import routes from '../src/App.js';
import Header from '../src/component/Header.js';
import {Provider} from 'react-redux';
import {getServerStore} from '../src/store/store'

const app=express();
const store=getServerStore();
app.use(express.static('public'));
app.get('*',(req,res)=>{
    const promises=[];
    routes.some(route=>{
        const match=matchPath(req.path,route);
        if(match){
            const loadData=route.component.loadData;
            if(loadData){
                promises.push(loadData(store))
            }
        }
        return match;
    })
    console.log('promises',promises);
    Promise.all(promises).then(()=>{
        const content=renderToString(
            <Provider store={store}>
            <StaticRouter location={req.url}>
                <Header/>
                {routes.map(route=>{
                    return <Route {...route}></Route>
                })}
            </StaticRouter>
            </Provider>
        );
        res.send(`<html>
        <head><meta charset="utf-8"><title>react ssr</title></head
        <body>
        <div id="root">${content}</div></body>
        <script>window.__context=${JSON.stringify(store.getState())}</script>
        <script src="/bundle.js"></script>
        </html>`)
    }).catch(()=>{
        res.send('505 error')
    })
})

app.listen('9093',()=>{
    console.log('success')
})