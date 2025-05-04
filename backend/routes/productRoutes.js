import express from "express"
import multer from "multer"
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import {requireAuth, optionalAuth} from "../middlewares/cookieJwtAuth.js";
import validateCategories from "../middlewares/validators/validateCategories.js";
import validateImages from "../middlewares/validators/validateImages.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.get("/", optionalAuth, getProducts);
router.post("/", requireAuth, upload.array("photo", 8), validateCategories, validateImages, createProduct);
router.put("/", requireAuth, validateCategories, updateProduct);
router.delete("/", requireAuth, deleteProduct);

export default router;