import userModel from "../models/user.model.js"
import dotenv from "dotenv";

dotenv.config();

const createUser = async (req, res) => {
    const { email, firstName, lastName, Mobile, password } = req.body;

    //not using authentication right now
    try{
        let user = await userModel.findOne({email});
        if( user ) return res.status(504).json({success:false,message:"user already exists!"});
        
        let new_user = await userModel.create({
            email,
            firstName,
            lastName,
            Mobile,
            password
        })
        console.log(new_user)
        return res.status(200).json({success:true,message:"user register successfully"})

    }
    catch(err){
        console.log(err.message)
        return res.status(504).json({success:false,message:"user register unsuccessfull"})
    }
}

export { createUser }