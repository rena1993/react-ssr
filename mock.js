const express=require('express');
const app=express();
app.get('/api/course/list',(req,res)=>{
    // res.header('Access-Control-Allow-Origin','*')
    // res.header('Access-Control-Allow-Method','GET,POST,PUT,DELETE,OPTION')
    res.header('Content-Type','application/json;charset=utf-8')
    res.json({
        code:0,
        list:[
            {name:'web first',id:1},
            {name:'web second',id:2},
            {name:'web third',id:3},
            {name:'web forth',id:4}
        ]
    })
})
app.get('/api/user',(req,res)=>{
    // res.header('Access-Control-Allow-Origin','*')
    // res.header('Access-Control-Allow-Method','GET,POST,PUT,DELETE,OPTION')
    res.header('Content-Type','application/json;charset=utf-8')
    res.json({
        code:0,
        data:{
            title:'kaikeba',
            best:'rena'
        }
    })
})

app.listen('9090',()=>{
    console.log('mock success')
})