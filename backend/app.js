import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan, { format } from "morgan"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import { requireAuth } from "./middlewares/cookieJwtAuth.js"
import errorHandler from "./middlewares/errorHandler.js"
import allowExternalImages from "./utils/allowExternalImages.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middlewares

app.use(helmet());
app.use(allowExternalImages ,express.static("public"));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.set('view engine', 'ejs');

// app.use(cors({
//   origin: true,          // reflect request Origin header — allows any origin
//   credentials: true,     // allow Set‑Cookie and Cookie headers
//   methods: ['GET','POST','PUT','DELETE','OPTIONS'],
//   allowedHeaders: ['Content-Type','Authorization']
// }));
// app.options('*', cors());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

app.get("/", requireAuth , (req, res)=>{
    res.send({message: req.user.full_name});
})

import { supabase } from "./config/db.js"
import createError from "./utils/createError.js"
app.get("/products/:id", async (req, res, next)=>{
    try{
    const product_id = req.params.id;
    console.log(product_id)
    const {data, error} = await supabase.from("products").select(`*, users(full_name, created_at), categories(category_name), images(image_url)`).eq("product_id", product_id).single();
    data.categories = data.categories.map((e) => e.category_name);
    data.images = data.images.map((e) => e.image_url);

    if(error){
        throw createError(error, 500);
    }
    console.log(data);
    if(!data){
        throw createError("Invalid product ID", 400);
    }
    res.render("product/index", data);
    }catch (err){
        next(err)
    }
})

app.get("/api/v1/categories", async (req, res, next)=>{
    try{
        const {data, err} = await supabase.from("categories").select();
        if(err){
            throw createError(err.message);
        }
        const categories = data.map((e)=> e.category_name);
        console.log(categories);
        res.json({message: categories})
    }catch(err){
        next(err);
    }
})

app.use(errorHandler);

app.listen(port, ()=>{
    console.log("Listening on port " + port);
})