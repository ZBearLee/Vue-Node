const os = require('os')
const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const koaBody = require('koa-body')

// cross domain http head 
// Allow-orgin-access

//koa2跨域解决方法？可以使用中间件解决
var cors = require('koa2-cors')

//解决表达post传值问题
const app = new Koa()


//文件上传是异步的，使用async进行异步处理
const main = async function (ctx) {
    const tmpdir = os.tmpdir()  //构建一个临时文件夹
    const filePaths = []
    const files = ctx.request.body.files || {}
    for (let key in files) {
        // console.log(file)
        //保存文件
        //saveFile异步
        //文件上传快慢不一，所有文件上传完成后
        //再返回结束异步变为同步
        //path
        const file = files[key]
        const filePath = path.join(tmpdir, file.name)
        console.log(tmpdir)
        console.log(file.name)
        console.log(filePath)
        // console.log(file.path)
        //里面有内容，读取流打开
        const reader = fs.createReadStream(file.path)
        //filePath  目的地有了，等内容
        const writer = fs.createWriteStream(filePath)
        reader.pipe(writer)
        filePaths.push(filePath)
    }
    // console.log(files)
    // console.log(tmpdir)
    // ctx.body = 'upload'
   // console.log(filePaths)
    //ctx.body = filePaths
    var arr=filePaths
    var str=arr.join('')
    //console.log(str)
    ctx.body = str
}

//koa2跨域
app.use(cors({
    // localhost:8080/upload
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return false
        }
        return '*'
    },
    exposeHeaders: ['WWW-Authenticate',
        'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type',
        'Authorization', 'Accept']
}))


app.use(koaBody({
    multipart: true    //多文件上传
}))
app.use(main)
app.listen(3000)



/* const Koa = require('koa')
const os = require('os')
const fs = require('fs')
const path = require('path')
const koaBody = require('koa-body')
var cors = require('koa2-cors');
const app = new Koa()
// cross domain  http head
//  Allow-origin-access
const main = async function(ctx) {
    const tmpdir = os.tmpdir()
    const filePaths = []
    const files = ctx.request.body.files || {}
    for (let key in files) {
        // 保存文件
        // saveFile 异步
        // 文件上传快慢不一， 所有文件上传完成
        // 再返回结果？ 异步变为同步
        // path
        const file = files[key]
        const filePath = path.join(tmpdir, file.name 

)
        console.log(filePath)
        console.log(file.path)
        // 里面有内容 读取流打开
        const reader = fs.createReadStream(file.path)
        // filePath 目的地有了，等内容
        const writer = fs.createWriteStream(filePath)
        reader.pipe(writer)
        filePaths.push(filePath)
    }
    ctx.body = filePaths
}
app.use(cors({
    // localhost:8080/upload
    origin: function(ctx) {
        if (ctx.url === '/test') {
            return false
        }
        return '*'
    },
    exposeHeaders: ['WWW-Authenticate',
    'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type',
     'Authorization', 'Accept']
}))
app.use(koaBody({
    multipart: true
}))
app.use(main)
app.listen(3000)
 */