import admin from "firebase-admin";

//crer nuevo usuario POST

export const createUser = async (ctx) => {
  try {
    const { email, password, displayName } = ctx.request.body;

    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: displayName,
    });

    const db = admin.database();
    await db.ref("users/" + userRecord.uid).set({
      email: email,
      displayName: displayName,
      password: password,
      createdAt: new Date().toISOString(),
    });

    ctx.body = {
      message: "Usario creado",
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        createdAt: userRecord.metadata.creationTime,
        password: password,
      },
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      message: "Error creating user",
      error: error.message,
    };
  }
};

//loguear usuario POST

export const loginUser = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;

    const userRecord = await admin.auth().getUserByEmail(email);

    ctx.body = {
      message: "Usuario logueado",
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        password: password,
        createdAt: userRecord.metadata.creationTime,
      },
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      message: "Error logueando usuario",
      error: error.message,
    };
  }
};
