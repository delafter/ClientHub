import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import dotenv from "dotenv";
import admin from "firebase-admin";
import serviceAccount from "../src/keys/client-database-68929-firebase-adminsdk-h83tf-d8fedd45a0.json" assert { type: "json" };
import cors from "@koa/cors";
import { createUser, loginUser } from "./controllers/authController.js";
import { signupClient, getClients, deleteClient, updateClient } from "./controllers/clientsController.js";

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://client-database-68929-default-rtdb.firebaseio.com/",
});

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

router.get("/", (ctx) => {
  ctx.body = "Hello, Koa!";
});

// Ruta para obtener datos de Firebase
router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/signupClient/:uid", signupClient);
router.get("/getClients/:uid", getClients);
router.delete("/deleteClient/:uid/:clientId", deleteClient);
router.patch("/updateClient/:uid/:clientId", updateClient);

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("localhost:3000");
});
