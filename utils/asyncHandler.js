
const asyncHandler=(fnc)=> async (req,res,next)=>{

    try {
        
     return   await fnc(req,res,next)

    } catch (error) {
      return    res.status(500).json({
            success:false,
            message:error.message
        })
    }

}




module.exports={asyncHandler}