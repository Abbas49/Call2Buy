import { supabase } from "../config/db.js";
import createError from "../utils/createError.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const updateUser = async (req, res, next)=>{
    try{
        const {email, password, phone, user_address, full_name} = req.body;
        const user = req.user;
        let hashedPassword;
        if(password){
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const {data, error} = await supabase.from("users").update({
            email: email?.toLowerCase().trim() || user.email,
            password_hash: hashedPassword || user.password_hash,
            full_name: full_name || user.full_name,
            phone: phone || user.phone,
            user_address: user_address || user.user_address
        }).eq("user_id", user.user_id).select().single();

        if(error){
            throw createError(error.message, 500)
        }

        const token = jwt.sign({
            user_id: data.user_id,
            email: data.email,
            full_name: data.full_name,
            exp: user.exp
        }, process.env.JWT_SECRET)

        const cookieOptions = {
            httpOnly: true, 
            sameSite: "strict",
        }

        if(user.expiresIn/60/60 > 5)
            cookieOptions.maxAge = user.expiresIn*1000;

        res.cookie("token", token, cookieOptions);

        res.status(200).json({message: "Your profile information has been successfully updated."})
    }catch(err){
        next(err);
    }
}

export const deleteUser = async (req, res, next)=>{
    try{
        const user = req.user;
        const {data, error} = await supabase.from("users").delete().eq("user_id", user.user_id);
        if(error){
            throw createError(error.message, 500);
        }

        res.clearCookie("token");
        res.status(200).json({message: "Your account has been successfully deleted."});
    }catch(err){
        next(err);
    }
}

export const getUser = async (req, res, next)=>{
    try{
        throw createError("This feature is not yet implemented. Please check back later.", 400);
    }catch(err){
        next(err);
    }
}