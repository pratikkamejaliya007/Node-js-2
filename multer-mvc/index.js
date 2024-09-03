import express from 'express'
import db from './db.js'
import router from './router/data.router.js'
import path from 'path'
import { fileURLToPath } from 'url'

const port=9000

const app=express()

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

app.set("view engine",'ejs')
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

// console.log(path.join(__dirname,'uploads'))

app.use("/",router)

app.listen(port,()=>console.log(`Server Is Port ${port} Running`))