import express from "express"

const router = express.Router();

router.get("/", getUsers);
router.put("/", updateUsers);
router.delete("/", deleteUsers);