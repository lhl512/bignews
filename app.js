const express = require('express')

const server = express()
const cors = require('cors')
server.use(cors())

const jwt = require('express-jwt');
// app.use(jwt().unless());
// jwt() 用于解析token，并将 token 中保存的数据 赋值给 req.user
// unless() 约定某个接口不需要身份认证
server.use('/uploads', express.static('uploads'))
server.use(jwt({
    secret: 'gz61', // 生成token时的 钥匙，必须统一
    algorithms: ['HS256'] // 必填，加密算法，无需了解
}).unless({
    path: ['/api/login', '/api/reguser', /^\/uploads\/.*/] // 除了这两个接口，其他都需要认证
}));


server.listen(3001, () => {
    console.log('服务在端口3001启动成功！');

})

// 路由
const userRouter = require('./router/user')
const personalRouter = require('./router/personal')
const articleRouter = require('./router/article')
server.use('/api', userRouter)
server.use('/my', personalRouter)
server.use('/my', articleRouter)

// 错误处理中间件
server.use((err, req, res, next) => {
    console.log('有错误', err)
    if (err.name === 'UnauthorizedError') {
        // res.status(401).send('invalid token...');
        res.status(401).send({
            code: 1,
            message: '身份认证失败！'
        });
    }
});