import express from 'express'
import { dashboard,from_basic, from_wizerd ,adddata, user, login , postlogin , deleteAdmin , edit,postedit} from '../controller/dashboardcontroller.js'

import { register , addregister , logout } from '../controller/User.controller.js'

import { auth , check } from '../middleware/auth.js'
import uploads from '../middleware/multer.js'
import passport from '../passport.config.js'

const router=express.Router()

// Route definitions
router.get("/register", register);  // make sure 'register' is defined and imported
router.post("/register", addregister);  // ensure 'addregister' is defined
router.get("/logout", logout);  // check 'logout' is defined
router.get("/login", login);  // ensure 'login' is defined
router.post("/login", passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }), postlogin);  // 'postlogin' should be defined

router.get("/",passport.checkAuth, dashboard);  // check 'dashboard' is defined
router.get("/users", passport.checkAuth,user);  // 'user' should be defined
router.get("/edit/:id",passport.checkAuth, edit);  // ensure 'edit' is defined
router.post("/edit/:id",passport.checkAuth, uploads, postedit);  // ensure 'postedit' is defined
router.get("/delete/:id",passport.checkAuth, deleteAdmin);  // ensure 'deleteAdmin' is defined

router.get("/from_basic",passport.checkAuth, from_basic);  // check 'from_basic' is defined
router.get("/from_wizerd",passport.checkAuth, from_wizerd);  // check 'from_wizerd' is defined
router.post("/add",passport.checkAuth, uploads, adddata);  // check 'adddata' is defined

export default router