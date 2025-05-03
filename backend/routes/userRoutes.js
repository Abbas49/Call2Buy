import express from "express"
import { requireAuth } from "../middlewares/cookieJwtAuth.js";
import { updateUser, deleteUser, getUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUser);
router.put("/", requireAuth, updateUser);
router.delete("/", requireAuth, deleteUser);

export default router