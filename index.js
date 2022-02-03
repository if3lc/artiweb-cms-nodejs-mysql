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

//Server start
app.listen(process.env.PORT, () => {
    console.log('Server is runing on http://localhost:' + process.env.PORT)
})