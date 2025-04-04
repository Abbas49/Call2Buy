import express from "express"
import multer from "multer"
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import cookieJwtAuth from "../middlewares/cookieJwtAuth.js";

const router = express.Router();
const upload = multer({ dest: multer.memoryStorage() })

router.get("/", getProducts);
router.post("/", cookieJwtAuth, upload.array("photos", 8),createProduct);
router.put("/", updateProduct);
router.delete("/", deleteProduct);

export default router;