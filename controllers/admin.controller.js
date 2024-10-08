const { sequelize } = require('../connectionToDB');
let {user,category,product}=require('../models/index')
let{asyncHandler}=require('../utils/asyncHandler')
let {ApiResponse}=require('../utils/ApiResponse')
let {ApiError}=require('../utils/ApiError')
let jwt=require("jsonwebtoken")
let {accessTokenSecret} =require('../config/utils.js')


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        
        const userr = await await user.findOne({
            where: {
                id:userId
            }
          });
        const accessToken = userr.generateAccessToken()
        const refreshToken = userr.generateRefreshToken()

      
        userr.refreshToken = refreshToken
        await userr.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

exports.Signup=asyncHandler(async (req,res)=>{
   
        let {firstName,lastName,email,password}=req.body

        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({message:"Please provide all required fields"})
        }

          // Check if the user already exists
    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
        return res.status(409).json({ message: "Email is already registered" });
    }
         let role="admin"
        let data=await user.create({firstName,lastName,email,password,role})
        
        return res.status(201).json({message:"User created Successfully !",data:data,success:1})
    
})

exports.Login=asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email, username, password} = req.body
    console.log(email);

    if ( !email) {
        throw new ApiError(400, "username or email is required")
    }
    
  
    const User = await user.findOne({
        where: {
         email:email
        }})

    if (!User) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await User.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

    // console.log("UserValidated",user.id)
   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(User.id)

    const loggedInUser = await user.findOne({
        where: { id: User.id },
        attributes: { exclude: ['password', 'refreshToken'] }
      });

    //these options are only for cookie so that cookie can be modified only by server
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                User: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

exports.addProduct=async (req,res)=>{
    try {
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
      const decodedToken = jwt.verify(token,accessTokenSecret)
        // Extract product details from request body
        const { name, description, price, stock, categoryId } = req.body;
    
        // Validate input
        if (!name || !description || !price || !stock || !categoryId  ) {
          return res.status(400).json({ message: 'All fields are required' });
        }
    
        // Check if category exists
        const categoryStatus = await category.findByPk(categoryId);
        if (!categoryStatus) {
          return res.status(404).json({ message: 'Category not found, Please provide correct value' });
        }
        //check if same product is not exist with same userId
        const productStatus = await product.findOne({where:{name:name,userId:decodedToken?.id }  });
        if (productStatus) {
          return res.status(404).json({ message: 'Sorry this product is already exist in your account' });
        }
    
        // Create new product
        const newProduct = await product.create({
          name,
          description,
          price,
          stock,
          categoryId,
          userId:decodedToken?.id
        });
    
        // Send success response
        return res.status(201).json({ message: 'Product created successfully', product: newProduct });
    
      } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
}

exports.addCategory=async(req,res)=>{
  
    const transaction = await sequelize.transaction(); // Start a transaction
   try {
     let {name}=req.body
     if(!name){
        await transaction.rollback(); // Rollback if validation fails
         return res.status(400).json({message:"Please provide all required fields"})
     }
 
     let Name= name.toLowerCase()
       // Check if the Category already exists
 const existingCategory = await category.findOne({ where: { name:Name } ,
    transaction});
 if (existingCategory) {
    await transaction.rollback(); 
     return res.status(400).json({ message: "This Category is already present." });
 }
      
     let data=await category.create({name:Name},{transaction})
     await transaction.commit(); 
     
     return res.status(201).json({message:"Category created Successfully !",data:data,success:1})
   } catch (error) {
    await transaction.rollback();
      console.error("Error occured while creating category",error.message)
   }

}