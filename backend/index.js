import express from "express"
import multer from "multer";
import bodyParser from "body-parser";
import { insertProduct, fetchProduct } from "./src/database/db.js";

const app = express();
const port = 3000;

const upload = new multer({storage:multer.memoryStorage()});

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/", (req, res)=>{
    res.send("Hello");
})

app.get("/products", async (req, res)=>{
    const {data, error} = await fetchProduct();
    if(error){
        console.error(error);
    }else{
        res.json(data);
    }
})

app.post("/addProduct", upload.single("image"), async (req, res)=>{
    const {name, rate, price} = req.body;
    console.log(name)
    console.log(rate)
    console.log(price)
    const error = await insertProduct(name, rate, price, req.file);
    if(error){
        res.send("Error happend");
    }else{
        res.send("Done");
    }
})

app.listen(port, ()=>{
    console.log("Listening on port " + port);
})