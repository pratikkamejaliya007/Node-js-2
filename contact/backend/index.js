import express from 'express'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import db from './db.js'
import cors from 'cors'

import userrouter from './router/user.router.js'
import contactrouter from './router/contact.router.js'

const port=8080
const app=express()
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

app.set("view engine","ejs")
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use("/uploads",express.static(path.join(__dirname,'uploads')))


app.use("/",userrouter)
app.use("/contact",contactrouter);

app.listen(port,()=>console.log(`Server Is Port ${port} Run`))