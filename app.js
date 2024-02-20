if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')
const filesRoutes = require('./routes/file')
const settingsRoutes = require('./routes/settings')

const favicon = require('serve-favicon');
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require("mongoose")
const path = require('path')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport');
const methodOverride = require('method-override');
let app = express()


app.use(express.static( path.join(__dirname,'/public')));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(flash())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.username = req.user ? req.user.username : null;
    next();
});

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connected to Mongo");
    })
    .catch(error => {
        console.error("Error connecting to Mongo:", error);
    });


app.use(authRoutes);
app.use('/user',userRoutes)
app.use('/files',filesRoutes)
app.use('/user/:username/settings', settingsRoutes)


app.get('/', (req, res) => {
    if(req.isAuthenticated())
        res.redirect('/user')
    else
        res.render('index')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`App is up and running on port: ${PORT}`)
})
