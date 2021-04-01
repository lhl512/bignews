const express = require('express')

const router = express.Router()
router.use(express.urlencoded())
const conn = require('../utils/sql')
// 获取文章分类列表
router.get('/article/cates', (req, res) => {
    const sql = 'select id,name,slug from categories'
    conn.query(sql, (err, result) => {
        if (err) {
            return res.json({
                status: 1,
                message: '获取文章分类失败'
            })
        }
        // const {id,name,slug} =result[0]
        res.json({
            status: 0,
            message: '获取文章分类列表成功!',
            data: result
        })
    })
})

// 新增文章分类
router.post('/article/addcates', (req, res) => {
    const {
        name,
        slug
    } = req.body

    console.log(name, slug);
    const sql = `insert into categories(name,slug) values ("${name}","${slug}")`
    conn.query(sql, (err, result) => {
        if (err) {
            return res.json({
                status: 1,
                message: "新增文章分类失败！"
            })
        }
        res.json({
            status: 0,
            message: '新增文章分类成功!'
        })
    })
})

// 根据文章id删除文章分类
router.get('/article/deletecate', (req, res) => {
    const {
        id
    } = req.query
    console.log(id);

    const sql = `delete from categories where id=${id}`
    console.log(sql);

    conn.query(sql, (err, result) => {
        if (err) {
            return res.json({
                status: 1,
                message: '删除文章分类失败!'
            })
        }
        res.json({
            status: 0,
            message: '删除文章分类成功!'
        })
    })
})

// 根据id获取文章分类数据
router.get('/article/getCatesById', (req, res) => {
    const {
        id
    } = req.query
    const sql = `select id,name,slug from categories where id=${id}`
    conn.query(sql, (err, result) => {
        if (err) {
            return res.json({
                status: 1,
                message: '获取文章分类失败!'
            })
        }
        const {
            id,
            name,
            slug
        } = result[0]
        res.json({
            status: 0,
            message: '获取文章分类数据成功!',
            data: {
                id,
                name,
                slug
            }
        })
    })
})

// 根据id更新文章分类数据
router.post('/article/updatecate', (req, res) => {
    const {
        id,
        name,
        slug
    } = req.body
    const sql = `update categories set name="${name}",slug="${slug}" where id =${id}`
    conn.query(sql, (err, result) => {
        if (err) {
            return res.json({
                status: 1,
                message: '更新分类数据失败!'
            })
        }
        res.json({
            status: 0,
            message: '更新分类数据信息成功!'
        })
    })
})

// 获取文章列表数据
router.get('/article/list', (req, res) => {
    const sql = `SELECT a.id,a.title,a.date,a.state,b.name FROM articles as a,categories as b where a.categoryId = b.id and a.isDelete =0

    `
    conn.query(sql, (err, result) => {
        if (err) {
            return res.json({
                status: 1,
                message: '获取文章列表数据失败!'
            })
        }
        res.json({
            status: 0,
            message: '获取文章列表数据成功!',
            data: result
        })
    })
})

// 根据id删除文章列表数据
router.get('/article/delList', (req, res) => {
    const {
        id
    } = req.query

    const sql = `update articles set isDelete =1 where id =${id}`
    console.log(sql);

    conn.query(sql, (err, result) => {
        if (err) {
            return res.json({
                status: 1,
                message: '删除文章列表失败!'
            })
        }
        res.json({
            status: 0,
            message: '删除文章列表成功!'
        })
    })
})
// 发表文章列表

module.exports = router