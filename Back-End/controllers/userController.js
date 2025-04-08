import userModel from "../models/userModel.js";

export const getUserData = async (req,res)=>{
    try {
        const {userID} = req.body;
        const user = await userModel.findById(userID);

        if(!user){
            return res.json({success: false, message: 'user not found'})
        }

        res.json({ success: true, 
            userData:{
                name: user.name,
                isAccountVerified: user.isAccountVerified,
            }
        })
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}