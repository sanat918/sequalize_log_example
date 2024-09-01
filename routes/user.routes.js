let express=require('express')
const { Signup,Login } = require('../controllers/user.controller')
let router=express.Router()


router.post('/signup', Signup)
router.post('/login', Login)

module.exports=router