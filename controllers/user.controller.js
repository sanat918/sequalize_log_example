const { Op } = require('sequelize');
let {user}=require('../models/index')

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


exports.Signup=async (req,res)=>{
       
        try {
            let {firstName,lastName,email,password}=req.body
    
            if(!firstName || !lastName || !email || !password){
                return res.status(400).json({message:"Please provide all required fields"})
            }

              // Check if the user already exists
        const existingUser = await user.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }
             let role="user"
            let data=await user.create({firstName,lastName,email,password,role})
            
            return res.status(201).json({message:"User created Successfully !",data:data,success:1})
        } catch (error) {
            return res.status(500).json({message:`Erorr while creating user `,Error:error.message})
        }
 
}


exports.Login=async(req,res)=>{
  
      try {
        let {username,email,password} =req.body
        if(!email ){
          return res.status(400).json({message:"Please provide all required fields"})
      }
  
       if(username){
          email=username
       }

      // Check if the user already exists
      const existingUser = await user.findOne({
        where: {
         email
        }
      });
      if (existingUser) {
          
          const isPasswordValid = await existingUser.isPasswordCorrect(password)
          
          if (!isPasswordValid) {
          throw new ApiError(401, "Invalid user credentials")
          }
         // console.log("UserValidated",user._id)
     const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(existingUser.id)
  
     const loggedInUser = await user.findOne({
        where: { id: existingUser.id },
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
        {
            Success:1,
           status:  200, 
             
                 user: loggedInUser, accessToken, refreshToken
             ,
             message:"User logged In Successfully"
          }
      )
  
      }
      else{
          return res.status(401).json({ message: "Sorry you are not registered" });
      }
  
      } catch (error) {
        return res.status(500).json({message:"Error Occured",Error:error.message})
      }
       

}

