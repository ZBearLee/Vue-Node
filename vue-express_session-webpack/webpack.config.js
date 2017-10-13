var path = require('path')
var webpack = require('webpack')

module.exports = {             //就是配置
    entry: './src/main.js',   //单点入口，从这个文件开始打包
    output: {                 //出口   
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist',
        filename: 'build.js'
    },
    module: {   //模块
        rules: [
            {
                test: /\.js$/, //正则 \.是对于.的转义   &是正则结束的标志   匹配的是js文件
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                //一个组件一个文件
                test: /\.vue$/,     //匹配的是vue文件
                loader: 'vue-loader',
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'   //名字  hash的作用是版本号
                }
            }
        ],
    },
    plugins:[  //插件  做一些可以拔插的功能
        new webpack.optimize.UglifyJsPlugin({   //优化程序的插件
            compress:{      //压缩
               // warning:false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize:true
        })
    ]
}