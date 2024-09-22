let express=require('express')
let router=express.Router()
let {verifyJWTAdmin}=require('../middleware/auth')
let{Signup,Login,addCategory,addProduct}=require('../controllers/admin.controller')


//add Product
router.post('/signup',Signup)
router.post('/login',Login)

router.post('/addCategory',verifyJWTAdmin,addCategory)
router.post('/addProduct',verifyJWTAdmin,addProduct)









module.exports=router