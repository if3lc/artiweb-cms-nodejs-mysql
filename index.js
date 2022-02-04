const express = require('express')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const mysql = require('mysql')

//Inıtialize the app
const app = express()


//MySQL conenction
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
})

db.connect((err) => {
    if (err) throw err
    console.log('Connected to database')
})

//Set view engine
app.set('view engine', 'ejs')

//Static public folder
app.use(express.static('public'))

//Routes
app.get('/', (req, res) => {
    res.render('index')
})

//Get all posts
app.get('/api/posts',(req, res) => {
    let sql = 'SELECT * FROM posts'
    db.query(sql, (err, row, fields) => {
        if (err) throw err
        res.json(row)
    })
});

//Get single post
app.get('/api/posts/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`
    db.query(sql, (err, row, fields) => {
        if (err) throw err
        res.json(row)
    })
})

//Create post
app.post('/api/posts', (req, res) => {
    let sql = `INSERT INTO posts (title, body) VALUES ('${req.body.title}', '${req.body.body}')`
    db.query(sql, (err, row, fields) => {
        if (err) throw err
        res.json(row)
    })
})

//Get all categories
app.get('/api/categories', (req, res) => {
    let sql = 'SELECT * FROM categories'
    db.query(sql, (err, row, fields) => {
        if (err) throw err
        res.json(row)
    })
})

//Get single category
app.get('/api/categories/:id', (req, res) => {
    let sql = `SELECT * FROM categories WHERE id = ${req.params.id}`
    db.query(sql, (err, row, fields) => {
        if (err) throw err
        res.json(row)
    })
})

//Create category
app.post('/api/categories', (req, res) => {
    let sql = `INSERT INTO categories (title, content) VALUES ('${req.body.title}', '${req.body.content}')`
    db.query(sql, (err, row, fields) => {
        if (err) throw err
        res.json(row)
    })
})

//Server start
app.listen(process.env.PORT, () => {
    console.log('Server is runing on http://localhost:' + process.env.PORT)
})