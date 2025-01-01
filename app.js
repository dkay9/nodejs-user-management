require('dotenv').config()
const express = require('express')
const expressLayout = require('express-ejs-layouts')
const connectDB = require('./server/config/db')

const app = express()
const port = 5000 || process.env.PORT

app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Connect to Database
connectDB()

//static folder
app.use(express.static('public'))

//templating engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

//routes
// app.get('/', (req, res) => {

//     const locals = {
//         title: "NodeJs",
//         description: "Free NodeJs Management System"
//     }

//     res.render('index', locals)
// })
app.use('/', require('./server/routes/customer'))


//Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})