var express = require('express');
var router = express.Router();
var loginprocess = require('../controller/loginprocess');
var signupprocess=require('../controller/signupprocess');
var dashboard = require('../controller/dashboard');
 // GET /
router.get('/login', loginprocess.getform)
router.get('/',signupprocess.getform)
router.get('/signup',signupprocess.getform)
router.get('/logout',loginprocess.logout)
router.get('/view',dashboard.getdata)
//POST
router.post('/login',loginprocess.validate)
router.post('/signup',signupprocess.validate) 
module.exports = router;