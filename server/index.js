import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {StaticRouter,matchPath,Route,Switch, Redirect} from 'react-router-dom';
import express from 'express';
import routes from '../src/App.js';
import Header from '../src/component/Header.js';
import {Provider} from 'react-redux';
import {getServerStore} from '../src/store/store';
import proxy from 'http-proxy-middleware';
import fs from 'fs';
import path from 'path';


const app=express();
const store=getServerStore();
app.use(express.static('public'));
app.use('/api/',proxy({
    target:'http://localhost:9090',changeOrigin:true
}))
function csrRender(res){
    const file=path.resolve(process.cwd(),'public/index.csr.html');
    const result=fs.readFileSync(file,'utf-8');
    // console.log('index.csr.html',result);
    res.send(result)
    
}
app.get('*',(req,res)=>{
    if(req.query._mode==='csr'){
        csrRender(res)
    }

    const promises=[];
    routes.some(route=>{
        const match=matchPath(req.path,route);
        if(match){
            const loadData=route.component.loadData;
            if(loadData){
                const promise=new Promise((resolve,reject)=>{
                    loadData(store).then(resolve).catch(resolve)
                });
                promises.push(promise)
                // promises.push(loadData(store))
            }
        }
        return match;
    })
    console.log('promises',promises);
    //allSettled
    const context={
        css:[]
    };
    Promise.all(promises).then(()=>{
        const content=renderToString(
            <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <Header/>
                <Switch>
                {routes.map(route=>{
                    return <Route {...route}></Route>
                })}
                </Switch>
            </StaticRouter>
            </Provider>
        );
        console.log(context);
        if(context.statusCode){
            res.status(context.statusCode)
        }
        if(context.action==='REPLACE'){
            res.redirect(301, context.url);
        }
        const css=context.css.join('');
        console.log(css);
        res.send(`<html>
        <head><meta charset="utf-8"><title>react ssr</title></head
        <body>
        <div id="root">${content}</div><style>${css}</style></body>
        <script>window.__context=${JSON.stringify(store.getState())}</script>
        <script src="/bundle.js"></script>
        </html>`)
    }).catch(
        ()=>{
            res.send('baocuole')
        }
    )
})

app.listen('9093',()=>{
    console.log('success')
})