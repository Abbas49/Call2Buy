import express from "express"
import multer from "multer"
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import {requireAuth, optionalAuth} from "../middlewares/cookieJwtAuth.js";
import validateCreateProduct from "../middlewares/validators/validateCreateProduct.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.get("/", optionalAuth, getProducts);
router.post("/", requireAuth, upload.array("photo", 8), validateCreateProduct, createProduct);
router.put("/", updateProduct);
router.delete("/", deleteProduct);

export default router;