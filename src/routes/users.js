import Router from "koa-router";
import { createUser, loginUser } from "../controllers/databaseController.js";

const router = new Router();

//ruta para crear un nuevo usuario
router.post("/signup", createUser);

//ruta para loguear un usuario
router.post("/login", loginUser);

export default router;