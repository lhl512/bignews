const express = require('express')

const server = express()

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