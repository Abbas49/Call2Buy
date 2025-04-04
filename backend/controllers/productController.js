import { supabase } from "../config/db.js"

export const getProducts = async (req, res)=>{

}

export const createProduct = async (req, res)=>{
    const {product_description, prodcut_address, title, price, phone, visibility, categories} = req.body;
    const seller = req.user.user_id;
    const photos = req.files;
}

export const updateProduct = async (req, res)=>{

}

export const deleteProduct = async (req, res)=>{

}
