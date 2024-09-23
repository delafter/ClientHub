// src/routes/index.js

import Router from "koa-router";
import { db } from "../config/firebase.js"; // Importa la base de datos

const router = new Router();

// Ruta principal
router.get("/", (ctx) => {
  ctx.body = "Hello, Mani!";
});

// Ruta para obtener datos de Firebase
router.get("/data", async (ctx) => {
  try {
    const snapshot = await db.collection("usuario").get();
    const data = snapshot.docs.map((doc) => doc.data());
    ctx.body = data;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Error fetching data from Firebase" };
  }
});

export default router;
