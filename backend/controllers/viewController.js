import { supabase } from "../config/db.js";
import createError from "../utils/createError.js";

export const productPage = async (req, res, next) => {
    try {
        const product_id = req.params.id;
        console.log(product_id)
        const { data, error } = await supabase.from("products").select(`*, users(full_name, created_at), categories(category_name), images(image_url)`).eq("product_id", product_id).single();
        if(error){
            res.redirect("/home");
            return;
        }
        data.categories = data.categories.map((e) => e.category_name);
        data.images = data.images.map((e) => e.image_url);
        console.log(data);

        if (!data) {
            throw createError("Invalid product ID", 400);
        }
        res.render("product/index", data);
    } catch (err) {
        next(err)
    }
}

export const editProductPage = async (req, res, next)=>{
    try {
        const product_id = req.params.id;
        const user = req.user;
        if(!user){
            res.redirect("/home");
            return;
        }
        console.log(product_id)
        const { data, error } = await supabase.from("products").select(`*, users(full_name, created_at), categories(category_name), images(image_url)`).eq("product_id", product_id).eq("seller", user.user_id).single();
        if(error){
            res.redirect("/home");
            return;
        }
        data.categories = data.categories.map((e) => e.category_name);
        data.images = data.images.map((e) => e.image_url);

        let { data: dbCategories, error: errorCategories } = await supabase.from("categories").select();
        dbCategories = dbCategories.map((e) => e.category_name);


        if (errorCategories) {
            throw createError(errorCategories, 500);
        }
        if (!data) {
            throw createError("Invalid product ID", 400);
        }
        
        res.render("edit/index", {...data, dbCategories});
    } catch (err) {
        next(err)
    }
}

export const myAccountPage = async (req, res, next) => {
    try {
        const user = req.user;
        if(!user){
            res.redirect("/login");
            return;
        }
        const { data: userData, error } = await supabase.from("users").select(`*`).eq("user_id", user.user_id).single();
        if(error){
            throw createError(error.message, 500);
        }
        delete userData.password_hash;

        const { data: userProducts, error: errorProducts } = await supabase.from("products").select(`*, images(image_url)`).eq("seller", user.user_id);
        if(errorProducts){
            throw createError(errorProducts.message, 500);
        }
        userProducts.forEach((product)=>{
            product.images = product.images.map((e) => e.image_url);
            product.mainImage = product.images[0];
        })


        const data = {
            user: userData,
            products: userProducts
        }
        console.log(data);
        res.render("my-account/index", data);
    } catch (err) {
        next(err)
    }
}
