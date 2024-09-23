import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import serviceAccount from '../src/keys/client-database-68929-firebase-adminsdk-h83tf-1a5b6652aa.json' assert { type: 'json' };

import { createUser, loginUser } from './controllers/databaseController.js';


dotenv.config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://client-database-68929-default-rtdb.firebaseio.com/',
});

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/', (ctx) => {
    ctx.body = 'Hello, Koa!';
});

// Ruta para obtener datos de Firebase
router.post ("/signup", createUser )
router.post ("/login", loginUser )

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('localhost:3000');
});

