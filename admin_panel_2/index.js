import express from 'express';
import db from './db.js'
import userrouter from './route/userroute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import session from 'express-session';
import passport from './passport.js';

const app=express()
const port=9090

const __filename=fileURLToPath(import.meta.url)
const  __dirname=dirname(__filename)

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/",express.static(path.join(__dirname,'public')))
app.set("view engine","ejs")

app.use(session({
    secret: 'pratik',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge : 100 * 100 * 60 * 60 * 60}
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuth)

app.use("/",userrouter)

app.listen(port,()=>console.log(`Server Is Port No. ${port} Run`))