const path=require('path');
const nodeExternals=require('webpack-node-externals');

module.exports={
    mode:'development',
    entry:'./client/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'public')
    },
    module:{
        rules:[
            {test:/\.js$/,
            loader:'babel-loader',
            exclude:/node_modules/,
            options:{
                presets:['@babel/preset-react',['@babel/preset-env']]
            }
            }
        ]
    }
}