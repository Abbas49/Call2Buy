import express from "express"
import bodyParser from "body-parser";
import { insertProduct, fetchProduct } from "./src/database/db.js";

const app = express();
const port = 3000;

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

app.post("/addProduct", async (req, res)=>{
    const {name, rate, price} = req.body;
    console.log(name)
    console.log(rate)
    console.log(price)
    const error = await insertProduct(name, rate, price);
    if(error){
        res.send("Error happend");
    }else{
        res.send("Done");
    }
})

app.listen(port, ()=>{
    console.log("Listening on port " + port);
})