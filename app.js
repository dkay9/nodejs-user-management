require('dotenv').config()
const express = require('express')
const expressLayout = require('express-ejs-layouts')
// const { flash } = require('express-flash-message')
const session = require('express-session')

const connectDB = require('./server/config/db')

const app = express()
const port = 5000 || process.env.PORT

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// npm install connect-flash
const flash = require('connect-flash');

//Connect to Database
connectDB()

//static files
app.use(express.static('public'))

// Express Session
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge : 1000 * 60 * 60 * 24 * 7, //one week 
        }
    })
)

// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }));
 
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