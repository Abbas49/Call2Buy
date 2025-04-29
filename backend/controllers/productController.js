import { supabase } from "../config/db.js"
import createError from "../utils/createError.js";

export const getProducts = async (req, res, next)=>{
    try{
        if(req.query["min_price"]) req.query["min_price"] = parseInt(req.query["min_price"]);
        if(req.query["max_price"]) req.query["max_price"] = parseInt(req.query["max_price"]);
        const {product_id, search_query, min_price, max_price, category } = req.query;
        console.log(req.query);

        let query = supabase.from("products").select(`*, users(full_name), categories(category_name), images(image_url)`).eq("visibility", "public");

        if(product_id){
            query.eq("product_id", product_id);
        }else{
            if(max_price) query.lte("price", max_price);
            if(min_price) query.gte("price", min_price);
            if(category) query.eq("categories.category_name", category)
            if(search_query){
                query.textSearch('title', search_query, {
                    type: 'websearch',
                    config: 'english'
                })
            }
        }
        const {data: products, error: titleSearchError}= await query.order("created_at", {ascending: false});
        if(titleSearchError){
            throw createError(titleSearchError.message, 500);
        }

        products.forEach((product)=>{
            delete product.views;
            delete product.seller;

            product.categories = product.categories.map((e) => e.category_name);
            product.images = product.images.map((e) => e.image_url);
        })
        res.json({products: products});
    }catch(err){
        next(err);
    }
}

export const createProduct = async (req, res, next)=>{
    try{
        const {product_description, product_address, title, price, phone, visibility, condition, categories} = JSON.parse(req.body.data);
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
            condition: condition
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
            const URL = (await supabase.storage.from("product-images").getPublicUrl(fileName)).data.publicUrl;
            URLs.push({image_url: URL, product_id: product_id, image_index: index});
        }

        // save images url into the database
        const {data, error} = await supabase.from("images").insert(URLs);
        if(error){
            throw createError(error, 500);
        }

        res.json({message:"done"});
    }catch(err){
        next(err);
    }
}

export const updateProduct = async (req, res)=>{

}

export const deleteProduct = async (req, res)=>{

}
