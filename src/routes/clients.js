import Router from "koa-router";
import {createClient, getClients, /* updateClient, */ deleteClient} from "../controllers/clientsController.js";

const router = new Router();

router.post("/signupClient/:uid", createClient);
router.get("/getClients/:uid", getClients);






export default router;