import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"

import authRoutes from "./routes/authRoutes.js"


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/v1/auth", authRoutes);
app.get("/", (req, res)=>{
    console.log(res.getHeaders());
    res.send("Hello");
})


app.listen(port, ()=>{
    console.log("Listening on port " + port);
})