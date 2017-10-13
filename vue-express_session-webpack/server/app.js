var path = require('path')
var express = require('express')

var bodyParser = require('body-parser')  //专门用于表单处理，包括用户名和密码，文件上传等
//应用级别的路由设置  request请求，response返回对象
//next对象可以讲中间件向下传递  error对象
//中间件middleware处理函数
//express是基于中间件的web server
//中间件通过串联方式，来提供服务


//验证你是你
var cookieParser = require('cookie-parser');
// 引用express-session模块
var session = require('express-session');


var indexRouter = require('./routes/index')


var userRouter = require('./routes/users')

var app = express()

app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'ejs')   //设置模板引擎
app.use(bodyParser.json())    //生成json对象
app.use(bodyParser.urlencoded({ extended: false }))   //表单中的转义

app.use(cookieParser())
app.use(session({
        secret: 'demo_test',  
        name: 'mydemo',
        cookie: {  maxAge: 30 * 60 * 1000 }, //30分钟
        resave: false,
        saveUninitialized: true
}))

/* app.get('/',function(req,res){
    //中间件可以终止中间件的传递
    //res.end('hello,express')
    res.send('hello,express')
    //  res.send返回的是页面
})

app.get('/api',function(req,res){
    res.json({
        username:'徐超'
    })
    //返回的是json返回的是请求ajax
}) */

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-with, X_Requested_With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('X-Powered-By', '3.2.1');
    res.header('Content-Type', 'application/json; charset=utf-8');
    if (req.method === 'OPTIONS') {
        res.end('options ok');
    } else {
        next();
    }
});

//要访问的到路径server/routes/index和users的路径，所以应该完成路由模块的分离以及路径的隐射
app.use('/', indexRouter)
app.use('/users', userRouter)

//app.listen(3000)一般上线会将其进行模块化输出、

module.exports = app