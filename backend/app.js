import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/authRoutes.js"
import cookieJwtAuth from "./middlewares/cookieJwtAuth.js"

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());


app.use("/api/v1/auth", authRoutes);
app.get("/", cookieJwtAuth, (req, res)=>{
    res.send("Hello "+req.user.full_name);
})


app.listen(port, ()=>{
    console.log("Listening on port " + port);
})