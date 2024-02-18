if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require("mongoose")
const path = require('path')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport');

let app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(flash())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to Mongo");
    })
    .catch(error => {
        console.error("Error connecting to Mongo:", error);
    });

app.use(authRoutes);
app.use(userRoutes)
app.get('/', (req, res) => {
    res.render('index')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`App is up and running on port: ${PORT}`)
})
