import jwt from "jsonwebtoken"
import { supabase } from "../config/db.js";
import dotenv from "dotenv"
import createError from "../utils/createError.js";
dotenv.config();

export const requireAuth = async (req, res, next) =>{
    try{
        const token = req.cookies.token;
        let JWTerror;
        const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            JWTerror = err;
            return decoded;
        });
        console.log(decoded)
        if(JWTerror){
            throw createError("Unauthorized access. Please log in again.", 401);
        }
        const user = (await supabase.from("users").select().eq("email", decoded.email)).data.at(0);
        if(!user){
            throw createError("User no longer exists", 400);
        }
        user.iat = decoded.iat
        user.exp = decoded.exp
        user.expiresIn = decoded.exp-Math.floor(Date.now()/1000)
        req.user = user;
        next();
    } catch(err){
        res.clearCookie("token");
        next(err);
    }
}

export const optionalAuth = async (req, res, next) =>{
    try{
        const token = req.cookies.token;
        if(token){
            let JWTerror;
            const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
                JWTerror = err;
                return decoded;
            });
            // go next even if it's not a valid user, because user is optional
            if(JWTerror){
                next();
                return;
            }
            const user = (await supabase.from("users").select().eq("email", decoded.email)).data.at(0);
            if(!user){
                throw createError("User no longer exists", 400);
            }
            req.user = user;
        }
        next();
    } catch(err){
        res.clearCookie("token");
        next(err);
    }
}