const express = require('express')

const server = express()

server.listen(3001, () => {
    console.log('服务在端口3001启动成功！');

})

// 路由
const userRouter = require('./router/user')
server.use('/api', userRouter)