import express from 'express'
import Database from './db.js'
import router from './router/dashboardrouter.js'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

const port=8000

const app=express()

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)

app.use("/",express.static(path.join(__dirname,'public')))

app.use("/",router)

app.listen(port,()=> console.log(`Server Is Port No. ${port} Running`))