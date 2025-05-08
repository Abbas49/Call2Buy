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
        let filteredProducts = products;
        if(category && category !== "All Categories"){
            filteredProducts = products.filter((product)=> product.categories.includes(category));
        }
        res.json({products: filteredProducts});
    }catch(err){
        next(err);
    }
}

export const createProduct = async (req, res, next)=>{
    try{
        const {product_description, product_address, title, price, phone, visibility, condition, categories} = JSON.parse(req.body.data);
        const seller = req.user.user_id;
        const images = req.files;

        if(!price || !title){
            throw createError("Missing required information: 'price' and 'title' must be included.", 400)
        }

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

        if(product.error){
            throw createError(product.error, 500);
        }
        const product_id = product.data[0].product_id;
        let product_categories = [];
        categories.forEach(category=> {
            const id = req.body.dbCategories.find((obj)=> obj.category_name === category).category_id;
            product_categories.push({product_id: product_id, category_id: id})
        });
        const {error: categoriesError} = await supabase.from("product_categories").insert(product_categories);
        if(categoriesError){
            throw createError(categories.message, 500);
        }

        // upload images
        let URLs = [];
        for(let index = 0; index < images.length; index++){
            const image = images[index];
            const fileName = `${product_id}-${index}.${image.originalname.split(".").pop()}`;
            const {data, error} = await supabase.storage.from("product-images").upload(fileName, image.buffer);
            if(error){
                await supabase.from("products").delete().eq("product_id", product_id);
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

export const updateProduct = async (req, res, next)=>{
    try{
        const {product_id, product_description, product_address, title, price, phone, visibility, condition, categories} = req.body;
        if(!product_id){
            throw createError("Product ID is required to update the product.")
        }
        const user = req.user;

        await supabase.from("product_categories").delete().eq("product_id", product_id);
        let product_categories = [];
        categories.forEach(category=> {
            const id = req.body.dbCategories.find((obj)=> obj.category_name === category).category_id;
            product_categories.push({product_id: product_id, category_id: id})
        });
        const {error: categoriesError} = await supabase.from("product_categories").insert(product_categories);
        if(categoriesError){
            throw createError(categories.message, 500);
        }

        const {data: product, error: selectError} = await supabase.from("products").select().eq("product_id", product_id).single();
        if(selectError){
            if(selectError.details === "The result contains 0 rows"){
                throw createError("The product you are trying to delete does not exist or has already been removed.", 404);
            }
            throw createError(selectError.message, 500);
        }

        if(product.seller != user.user_id){
            throw createError("Unauthorized: You do not have permission to update this product.", 401);
        }

        const {data: updatedProduct, error: updateError} = await supabase.from("products").update({
            product_description: product_description || product.product_description,
            product_address: product_address || product.product_address,
            title: title || product.title,
            price: price || product.price,
            phone: phone ||  product.phone,
            visibility: visibility || product.visibility,
            condition: condition || product.condition 
        }).eq("product_id", product_id);

        if(updateError){
            throw createError(updateError.message, 500);
        }

        res.json({message: "Product updated successfully."});
    }catch(err){
        next(err);
    }
}

export const deleteProduct = async (req, res, next)=>{
    try{
        const {product_id} = req.body;
        const user = req.user;

        const {data: product, error} = await supabase.from("products").select().eq("product_id", product_id).single();
        if(error){
            if(error.details == "The result contains 0 rows"){
                throw createError("The product you are trying to delete does not exist or has already been removed.", 404);
            }
            throw createError(error.message, 500);
        }

        if(product.seller !== user.user_id){
            throw createError("Unauthorized: You do not have permission to delete this product.", 401);
        }

        const {data, error: deleteError} = await supabase.from("products").delete().eq("product_id", product_id);
        if(deleteError){
            throw createError(deleteError.message, 500);
        }
        
        res.status(200).json({message: "Product successfully deleted."})
    }catch(err){
        next(err);
    }
}
