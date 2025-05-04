import { supabase } from "../../config/db.js";
import createError from "../../utils/createError.js";

const validateCategories = async (req, res, next)=>{
    try{
        let jsonRequest;
        if(req.body.data){
            jsonRequest = JSON.parse(req.body.data);
        }else{
            jsonRequest = req.body;
        }
        const {categories} = jsonRequest;

        if(!categories){
            throw createError("You need to add at least one category to the product", 400);
        }

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
        next(err)
    }
}

export default validateCategories;