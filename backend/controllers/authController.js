import {supabase} from "../config/db.js"
import bcrypt from "bcrypt"

export const register = async (req, res) =>{
    try{
        const {email, password, phone, user_address, full_name} = req.body;

        // Check if email exists in the database
        const user = await supabase.from("users").select().eq("email", email);
        if(user.data && user.data.length != 0){
            throw new Error("The provided email is already registered. Please use a different email or log in");
        }

        // Hash the password and insert user data into the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await supabase.from("users").insert({
            email: email,
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
        res.status(500).json({message: err.message});
    }
}

export const login = async (req, res) =>{
    console.log("Login");
}