import Router from "koa-router";
import { createUser, loginUser } from "../controllers/authController.js";

const router = new Router();

router.post("/signup", createUser);
router.post("/login", loginUser);

export default router;
