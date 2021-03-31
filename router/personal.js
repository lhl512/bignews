const express = require('express')
const router = express.Router()
const multer = require('multer')

// 精细化去设置，如何去保存文件
const storage = multer.diskStorage({
    // 保存在哪里
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    // 保存时，文件名叫什么
    filename: function (req, file, cb) {
        // console.log('file', file)
        // 目标： 新名字是时间戳+后缀名
        const filenameArr = file.originalname.split('.');
        // filenameArr.length-1是找到最后一个元素的下标
        const fileName = Date.now() + "." + filenameArr[filenameArr.length - 1]
        cb(null, fileName) //
    }
})
const upload = multer({
    storage
})
router.use(express.urlencoded())

const conn = require('../utils/sql')

// 获取用户的基本信息
router.get('/userinfo', (req, res) => {
    const {
        username
    } = req.query
    // console.log(username);
    let sql = `select id,username,nickname,email,userPic from users where username="${username}" `

    // console.log(sql);

    conn.query(sql, (err, result) => {
        if (err) {
            return res.json({
                status: 1,
                message: '获取数据失败!'
            })
        }
        const {
            id,
            username,
            nickname,
            email,
            userPic
        } = result[0]
        // console.log(result);
        res.json({
            status: 0,
            message: '获取数据成功!',
            data: {
                id,
                username,
                nickname,
                email,
                userPic,
            }
        })
    })
})

// 更新用户的基本信息

router.post('/userinfo', (req, res) => {
    const {
        id,
        nickname,
        email,
        userPic
    } = req.body
    console.log(id, nickname, email, userPic);
    const sql = `update users set nickname="${nickname}",email="${email}",userPic="${userPic}" where id=${id}`
    conn.query(sql, (err, result) => {
            if (err) {
                return res.json({
                    status: 1,
                    message: '更新数据失败!'
                })
            }
            res.json({
                status: 0,
                message: '更新数据成功!'
            })
        }

    )

})

// 上传用户头像
router.post('/uploadPic', upload.single('file_data'), (req, res) => {
    // console.log(name);

    let file = "http://127.0.0.1:3001/uploads/" + req.file.filename
    console.log(file);
    res.json({
        status: 0,
        message: file
    })
})
// 重置密码
router.post('/updatepwd', (req, res) => {
    const {
        id,
        oldPwd,
        newPwd
    } = req.body
    // console.log(id, oldPwd, newPwd);

    if (oldPwd == newPwd) {
        res.json({
            status: 1,
            message: '新密码不能和旧密码相同!'
        })
        return
    }
    const sql = `update users set password="${newPwd}" where id=${id} `
    // console.log(sql);

    conn.query(sql, (err, result) => {
        if (err) {
            return res.json({
                status: 1,
                message: '密码修改失败!'
            })
        }
        res.json({
            status: 0,
            message: '密码修改成功!'
        })
    })
})

module.exports = router