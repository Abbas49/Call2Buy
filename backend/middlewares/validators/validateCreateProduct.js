import { supabase } from "../../config/db.js";
import createError from "../../utils/createError.js";

const validateCreateProdcut = async (req, res, next)=>{
    try{
        const {product_description, prodcut_address, title, price, phone, visibility, categories} = JSON.parse(req.body.data);
        const seller = req.user.user_id;
        const photos = req.files;
        // check if product data is valid
        if(!categories){
            throw createError("You need to add at least one category to the product", 400);
        }


        // make sure all the categories are in the db
        const dbCategories = (await supabase.from("categories").select()).data;
        let categoriesSet = new Set();
        dbCategories.forEach((category)=>{
            categoriesSet.add(category.category_name);
        })

        // validate categories
        categories.forEach((category)=>{
            if(!categoriesSet.has(category)){
                throw createError("Invalid category list, make sure that every single category is a valid cateogry in our list.", 400)
            }
        })
        req.body.dbCategories = dbCategories;
        next();
    }catch(err){
        res.status(err.statusCode || 500).json({message: err.message});
    }
}

export default validateCreateProdcut;