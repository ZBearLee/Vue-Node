var express = require('express')
var router = express.Router()   //路由对象
//路径都是基于这个模块的

// router.get('/',function(req,res){
//     res.send('hello,index.js')
// })

router.get('/', function (req, res) {
    //数据库查询 
    //Promise  json

    res.render('index',{
        name:'秋香'
    })
})


module.exports = router


//模块路由
//users/books/movies都是路由的模块

