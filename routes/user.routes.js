let express=require('express')
const { Signup,Login,createOrder,addToCart } = require('../controllers/user.controller')
let router=express.Router()


router.post('/order',createOrder)



router.post('/signup', Signup)
router.post('/login', Login)
router.post('/addToCart',addToCart)

module.exports=router