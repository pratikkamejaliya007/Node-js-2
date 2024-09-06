import express from 'express'
import { chart, dashboard, wigtes , table, width , from_basic, from_wizerd } from '../controller/dashboardcontroller.js'

const router=express.Router()

router.get("/",dashboard)
router.get("/chart",chart)
router.get("/wigtes",wigtes)
router.get("/table",table)
router.get("/full-width",width)
router.get("/from_basic",from_basic)
router.get("/from_wizerd",from_wizerd)

export default router