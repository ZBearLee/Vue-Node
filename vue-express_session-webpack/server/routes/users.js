var express = require('express')
var router = express.Router()  //路由模块
    //路径都是基于这个模块的
router.get('/', function(req, res) {
    if (req.session.views) {
        req.session.views++
            res.json({
                msg: '第' + req.session.views + '次访问'
            })
    } else {
        req.session.views = 1
        res.json({
            msg: '欢迎您的到来'
        })
    }
})

router.get('/home', (req, res) => {
    console.log(req.session.id 

)
    if (req.session.token) {
        res.json({
            token: req.session.token
        })
    } else {
        res.json({
            msg: '授权过期重新登录'
        })
    }
})

router.post('/login', (req, res) => {
     //怎么能直接登录？账号和密码？
    //数据库检测
    //怎么去获取?  ->req  ->controller  ->model(数据库) 
    //->返回一个json或者html   ->res  ->200
    // console.log(req.body)
    let data = req.body,
        pwd = data.pwd ? data.pwd.toString() : '',
        phone = data.telephone ? data.telephone.toString() : ''
    if (phone === '') {
        res.json({
            code: 3003,
            errmsg: '手机号为空'
        })
        return
    }
    if (pwd === '') {
        res.json({
            code: 3001,
            errmsg: '密码为空'
        })
        return
    }

    let tPhone = '10086',
        tPwd = '123456'
    if (phone != tPhone) {
        res.json({
            code: -1,
            errmsg: '账号不存在'
        })
        return
    }
    if (pwd != tPwd) {
        res.json({
            code: -1,
            errmsg: '密码错误'
        })
        return
    }
    req.session.token = tPhone + '_' + randomToken()
    //从用户中获取,'_'为了唯一性，randomToken也是为了更安全
    res.json({
        code: 200,
        token: req.session.token,
        msg: '登录成功'
    })

    function randomToken(len) {
        var len = len || 32
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        var maxpos = chars.length
        var str = ''
        for (var i = 0; i < len; i++) {
            str += chars.charAt(Math.floor(Math.random() * maxpos))
        }
        return str
    }
})
router.post('/signOut', (req, res) => {
    req.session.token = null
    res.json({
        code: 200,
        msg: '感谢使用'
    })
})
module.exports = router
//模块路由
//users/books/movies都是路由的模块