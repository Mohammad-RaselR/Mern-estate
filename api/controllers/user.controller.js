import User from "../models/user.module.js"
import { errorHandler } from "../utils/error.js"
// import {clearCookies} from "cookie-parser"
import bcryptjs from 'bcryptjs'
export const test= (req, res)=>{
    res.json({
        message:"Hello world"
    })
}
export const updateUser=async (req, res, next)=>{
    const { username,email } = req.body;
    const existingUser = await User.findOne({ username });
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'You can only update your own account!'));

    if(existingUser && existingUser._id!=req.params.id){
        return next(errorHandler(409, 'Username already exists!'));
    }
    const existingEmail = await User.findOne({ email });
    if(existingEmail && existingEmail._id!=req.params.id){
        return next(errorHandler(409, 'Email already exists!'));
    }

    try{
        
        if(req.body.password){
            req.body.password= bcryptjs.hashSync(req.body.password, 10 )}

    const updatedUser= await User.findByIdAndUpdate(req.params.id, {
        $set:{
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar
        }

    }, {new: true})


    const {password, ...rest}= updatedUser._doc;
    res.status(200).json(rest); 
    
    } catch(error){

    }
}
export const deleteUser= async(req, res, next)=>{
    if(req.user.id!==req.params.id){
        return next(errorHandler(401, 'You can only delete your own account!'));
    }
    try{
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json("User has been deleted"); 
    }
    catch(error){
        next(error);
    }
}