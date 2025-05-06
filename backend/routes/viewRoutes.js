import express from "express"
import { productPage, editProductPage, myAccountPage } from "../controllers/viewController.js";
import { optionalAuth } from "../middlewares/cookieJwtAuth.js";

const router = express.Router();

router.get("/products/:id", productPage);
router.get("/edit/:id", optionalAuth, editProductPage);
router.get("/my-account", optionalAuth, myAccountPage);

export default router;