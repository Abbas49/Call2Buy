import {supabase} from "../config/db.js"
import bcrypt from "bcrypt"
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) =>{
    try{
        const {email, password, phone, user_address, full_name} = req.body;
        if(!email){
            throw createError("Email is required", 400);
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check if email exists in the database
        const user = await supabase.from("users").select().eq("email", normalizedEmail);
        if(user.data && user.data.length != 0){
            throw createError("The provided email is already registered. Please use a different email or log in", 409);
        }

        // Hash the password and insert user data into the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await supabase.from("users").insert({
            email: normalizedEmail,
            password_hash: hashedPassword,
            full_name: full_name,
            phone: phone,
            user_address: user_address
        });
        if(result.error){
            throw new Error(result.error.message);
        }

        res.status(200).json({message: "Your account has been successfully created"});
    }catch (err){
        res.status(err.statusCode || 500).json({message: err.message});
    }
}

export const login = async (req, res) =>{
    try{
        const {email, password, remember_me} = req.body;
        if(!email || !password){
            throw createError("Email and password are required", 400);
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = (await supabase.from("users").select().eq("email", normalizedEmail)).data.at(0);
        if(!user){
            throw createError("Wrong email or password", 401);
        }
        const match = await bcrypt.compare(password, user.password_hash);
        if(!match){
            throw createError("Wrong email or password", 401);
        }
        
        const token = jwt.sign({
            user_id: user.user_id,
            email: user.email,
            full_name: user.full_name
        }, process.env.JWT_SECRET, {expiresIn: (remember_me?"30d":"5h")})

        const cookieOptions = {
            httpOnly: true, 
            sameSite: "strict",
        }
        if(remember_me)
            cookieOptions.maxAge = 30 * 24 * 60 * 60 * 1000 // 30 day

        res.cookie("token", token, cookieOptions);

        res.status(200).json({message: "Login successful!"});
    }catch(err){
        res.status(err.statusCode || 500).json({message: err.message});
    }
}


export const logout = async (req, res)=>{
    res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    });
    res.clearCookie("token");
    res.json({message: "Done"});
}