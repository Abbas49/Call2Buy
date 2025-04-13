import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import { requireAuth } from "./middlewares/cookieJwtAuth.js"
import errorHandler from "./middlewares/errorHandler.js"

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(errorHandler);


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

app.get("/", requireAuth , (req, res)=>{
    res.send("Hello "+req.user.full_name);
})


app.listen(port, ()=>{
    console.log("Listening on port " + port);
})