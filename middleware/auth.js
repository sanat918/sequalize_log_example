let{ ApiError } =require("../utils/APiError.js");
let{ asyncHandler } =require("../utils/asyncHandler");
let jwt=require("jsonwebtoken")
let { user } =require("../models/index.js");
let {accessTokenSecret} =require('../config/utils.js')

exports.verifyJWTUser = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, accessTokenSecret)
    
        const User = await user.findOne({
            where: { id: decodedToken?._id, role: 'user' },
            attributes: { exclude: ['password', 'refreshToken'] }
          });
        if (!User) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = User;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})

exports.verifyJWTAdmin = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token,accessTokenSecret)
    
        const User =  await user.findOne({
            where: { id:decodedToken?._id, role: 'admin' },
            attributes: { exclude: ['password', 'refreshToken'] }
          });

        if (!User) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = User;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})