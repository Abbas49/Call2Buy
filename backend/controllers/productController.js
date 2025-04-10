import { supabase } from "../config/db.js"
import createError from "../utils/createError.js";

export const getProducts = async (req, res)=>{

}

export const createProduct = async (req, res)=>{
    try{
        const {product_description, product_address, title, price, phone, visibility, categories} = JSON.parse(req.body.data);
        const seller = req.user.user_id;
        const images = req.files;
        const product = await supabase.from("products").insert({
            seller: seller,
            product_description: product_description,
            product_address: product_address,
            title: title,
            price: price,
            phone: phone || req.user.phone,
            visibility: visibility,
        }).select();
        const product_id = product.data[0].product_id;
        let product_categories = [];
        categories.forEach(category=> {
            const id = req.body.dbCategories.find((obj)=> obj.category_name === category).category_id;
            product_categories.push({product_id: product_id, category_id: id})
        });
        await supabase.from("product_categories").insert(product_categories);

        // upload images
        let URLs = [];
        for(let index = 0; index < images.length; index++){
            const image = images[index];
            const fileName = `${product_id}-${index}-${image.originalname}`;
            const {data, error} = await supabase.storage.from("product-images").upload(fileName, image.buffer);
            if(error){
                throw createError(error.message, 500);
            }
            const URL = await supabase.storage.from("product-images").getPublicUrl(fileName).data.publicUrl;
            URLs.push({image_url: URL, product_id: product_id, image_index: index});
        }

        // save images url into the database
        const {data, error} = await supabase.from("images").insert(URLs);
        if(error){
            throw createError(error, 500);
        }

        res.json({message:"done"});
    }catch(err){
        res.status(err.statusCode || 500).json({message: err.message});
    }
}

export const updateProduct = async (req, res)=>{

}

export const deleteProduct = async (req, res)=>{

}
