import admin from "firebase-admin";
import dotenv from "dotenv";
import serviceAccount from "./kay/client-database-68929-firebase-adminsdk-h83tf-1a5b6652aa.json";


dotenv.config(); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://client-database-68929-default-rtdb.firebaseio.com/",
});

export const db = admin.firestore(); 


