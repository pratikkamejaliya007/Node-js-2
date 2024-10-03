import express from 'express'
import Database from './db.js'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import cookieParser from 'cookie-parser'

// Router
import router from './router/dashboardrouter.js'
import categoryrouter from './router/Categoryroute.js'
import subcategoryrouter from './router/Subcatego.route.js'
import productrouter from './router/Productroute.js'

const port=8000

const app=express()

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(cookieParser())

const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)

app.use("/",express.static(path.join(__dirname,'public')))
app.use("/uploads",express.static(path.join(__dirname,'uploads')))

app.use("/",router)
app.use("/category",categoryrouter);
app.use("/subcategory",subcategoryrouter)
app.use("/product",productrouter)

app.listen(port,()=> console.log(`Server Is Port No. ${port} Running`))