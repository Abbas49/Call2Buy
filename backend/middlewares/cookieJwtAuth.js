import jwt from "jsonwebtoken"
import { supabase } from "../config/db.js";
import dotenv from "dotenv"
dotenv.config();

const cookieJwtAuth = async (req, res, next) =>{
    try{
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = (await supabase.from("users").select().eq("email", decoded.email)).data.at(0);
        if(!user){
            throw new Error("User no longer exists");
        }

        req.user = user;
        next();
    } catch(err){
        res.clearCookie("token");
        res.status(401).json({message: "Unauthorized access. Please log in again."});
    }
}


export default cookieJwtAuth;