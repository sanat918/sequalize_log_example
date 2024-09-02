let express=require('express')
const { Signup,Login,createOrder } = require('../controllers/user.controller')
let router=express.Router()


router.post('/order',createOrder)



router.post('/signup', Signup)
router.post('/login', Login)

module.exports=router