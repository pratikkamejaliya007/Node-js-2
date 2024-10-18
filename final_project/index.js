import express from 'express'
import db from './db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const port = 9000
const app = express()


import adminRouter from './route/Admin.route.js'
import managerRouter from './route/Manager.route.js'
import employeeRouter from './route/Employee.route.js'

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use("/admin",adminRouter)
app.use("/manager",managerRouter)
app.use("/employee",employeeRouter)

app.listen(port,()=> console.log(`Server Is Port No. ${port} Run`))