const express = require('express')
const router = express.Router()
const conn = require('../utils/sql')
router.use(express.urlencoded())

// 用户注册接口
router.post('/reguser', (req, res) => {
    const {
        username,
        password
    } = req.body
    const sqlSelect = `select username from users where username="${username}"`
    conn.query(sqlSelect, (err, result) => {
        if (err) {
            return res.json({
                status: 1,
                message: '服务器错误'
            })
        }
        if (result.length > 0) {
            return res.json({
                status: 1,
                message: '该用户已经被注册！'
            })
        }
        // console.log(username, password);
        const sql = `insert into users(username,password) values ("${username}","${password}")`
        console.log(sql);

        conn.query(sql, (err, result) => {
            if (err) {
                return res.json({
                    status: 1,
                    message: '服务器错误'
                })
            }
            res.json({
                status: 0,
                message: '注册成功！'
            })
        })
    })

})

// 用户登录接口

router.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body
    const sqlSelect = `select username,password from users where username="${username}" and password="${password}"`
    conn.query(sqlSelect, (err, result) => {
        if (err) {
            return res.json({
                status: 1,
                message: '用户名或密码错误!'
            })
        }
        res.json({
            status: 0,
            message: '登录成功！'
        })
    })
})
module.exports = router