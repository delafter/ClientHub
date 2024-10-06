import Router from "koa-router";
import {
  signupClient,
  getClients,
  updateClient,
  deleteClient,
} from "../controllers/clientsController.js";

const router = new Router(); 

router.post("/signupClient/:uid", signupClient);
router.get("/getClients/:uid", getClients);
router.delete("/deleteClient/:uid/:clientId", deleteClient);
router.patch("/updateClient/:uid/:clientId", updateClient);

export default router;
