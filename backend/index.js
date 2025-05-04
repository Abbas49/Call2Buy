import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan, { format } from "morgan"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from "url"

import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import viewRouter from "./routes/viewRoutes.js"
import { requireAuth } from "./middlewares/cookieJwtAuth.js"
import errorHandler from "./middlewares/errorHandler.js"
import allowExternalImages from "./utils/allowExternalImages.js"

dotenv.config();

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// middlewares

app.use(helmet());
app.use(allowExternalImages, express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/", viewRouter)



app.get("/", (req, res)=>{
    res.redirect("/home");
})
app.get("/api/v1/username", requireAuth , (req, res)=>{
    res.send({message: req.user.full_name});
})


import { supabase } from "./config/db.js"
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

import aiRewrite from "./utils/aiRewrite.js"
app.post("/api/v1/ai/rewrite", async (req, res, next)=>{
    try{
        const {description} = req.body;

        const rewrite = await aiRewrite(description);
        res.json({message: rewrite})
    }catch(err){
        next(err);
    }
})

app.use(errorHandler);

app.listen(port, ()=>{
    console.log("Listening on port " + port);
})