const express = require('express')
const app = express()
const mysql = require('mysql2')
const path = require('path')
const { nextTick } = require('process')
const port = 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '/public')))


function getCurrentTime() {
    const currentDay = new Date()
    date = currentDay.getDate()
    year = currentDay.getFullYear()
    month = currentDay.getMonth() + 1
    const currentTime = month + '/' + date + '/' + year

    return currentTime
}

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'M456hui098sa#',
    database: 'Wall'
})

connection.connect(err => {
    if (err) throw err
    console.log('Connected')
})

app.get('/', (req, res) => {
    connection.query("SELECT * FROM Posts", (err, rows) => {
        if (err) throw err
        res.render('index', {items: rows})
    })
})

app.get('/creators', (req, res) => {
    res.render('creators')
})

app.get('/media', (req, res) => {
    res.render('media')
})

app.post('/media', (req, res) => {
    const title = req.body.title
    const content = req.body.content
    const date = getCurrentTime()

    let sql = "INSERT INTO POSTS VALUES(null, '"+ title +"', '"+ content +"', '"+ date +"')"
    connection.query(sql, function (err) {
        if (err) throw err
        res.send(`Submitted! You can check it out on <a href='/'>homepage</a>`)
    })
})

app.listen(port, () => {
    console.log(`The webapp is working on at http://localhost:${port}`)
})