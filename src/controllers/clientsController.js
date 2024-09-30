import admin from "firebase-admin";

// Crear nuevo cliente por id de usuario POST
export const signupClient = async (ctx) => {
  const uid = ctx.params.uid; // Obtiene el uid de los parámetros de la URL

  try {
    const {
      cliente,
      email,
      telefono,
      direccion,
      fechaCreacion,
      revista,
      importe,
      comercial,
    } = ctx.request.body;

    // Referencia a la base de datos
    const db = admin.database();
    const clientRef = db.ref("clients").child(uid);

    // Verifica si el cliente ya existe (usando el email como identificador único)
    const existingClientSnapshot = await clientRef.orderByChild('revista').equalTo(revista).once("value");
    if (existingClientSnapshot.exists()) {
      ctx.status = 400; // Bad Request
      ctx.body = {
        message: "Error creando cliente",
        error: "Ya existe un cliente con ese correo electrónico.",
      };
      return;
    }

    // Guarda el cliente en la base de datos
    const newClientRef = clientRef.push(); // Crea una nueva referencia para el cliente
    await newClientRef.set({
      cliente: cliente,
      email: email,
      telefono: telefono,
      direccion: direccion,
      fechaCreacion: fechaCreacion,
      revista: revista,
      importe: importe,
      comercial: comercial,
    });

    ctx.body = {
      message: "Cliente creado",
      client: {
        id: newClientRef.key, // ID del cliente creado
        cliente: cliente,
        email: email,
        telefono: telefono,
        direccion: direccion,
        fechaCreacion: fechaCreacion,
        revista: revista,
        importe: importe,
        comercial: comercial,
      },
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      message: "Error creando cliente",
      error: error.message,
    };
  }
};

// Obtener todos los clientes de un usuario GET

export const getClients = async (ctx) => {
    const uid = ctx.params.uid; // UID del usuario
    console.log(`UID recibido: ${uid}`);
  
    try {
      const db = admin.database();
      const clientsRef = db.ref("clients").child(uid); // Referencia a todos los clientes del usuario
      const snapshot = await clientsRef.once("value");
      const clients = snapshot.val();
  
      if (!clients) {
        ctx.status = 404; 
        ctx.body = {
          message: "No se encontraron clientes para este usuario.",
        };
        return;
      }
  
      ctx.body = {
        message: "Clientes obtenidos",
        clients: clients,
      };
    } catch (error) {
      console.error("Error en getClients:", error);
      ctx.status = 400;
      ctx.body = {
        message: "Error obteniendo los clientes",
        error: error.message,
      };
    }
  };
  
  // elimminar cliente por id de usuario y id de cliente DELETE

  export const deleteClient = async (ctx) => {
    const uid = ctx.params.uid; // UID del usuario
    const clientId = ctx.params.clientId; // ID del cliente a eliminar
  
    try {
      const db = admin.database();
      const clientRef = db.ref("clients").child(uid).child(clientId);
      const clientSnapshot = await clientRef.once("value");
  
      if (!clientSnapshot.exists()) {
        ctx.status = 404;
        ctx.body = {
          message: "Cliente no encontrado",
        };
        return;
      }
  
      await clientRef.remove(); // Elimina el cliente de la base de datos
  
      ctx.body = {
        message: "Cliente eliminado",
      };
    } catch (error) {
      console.error("Error en deleteClient:", error);
      ctx.status = 400;
      ctx.body = {
        message: "Error eliminando el cliente",
        error: error.message,
      };
    }
  };

  // Actualizar cliente por id de usuario y id de cliente PUT

  export const updateClient = async (ctx) => {
    const uid = ctx.params.uid; // UID del usuario
    const clientId = ctx.params.clientId; // ID del cliente a actualizar
  
    try {
      const db = admin.database();
      const clientRef = db.ref("clients").child(uid).child(clientId);
      const clientSnapshot = await clientRef.once("value");
  
      if (!clientSnapshot.exists()) {
        ctx.status = 404;
        ctx.body = {
          message: "Cliente no encontrado",
        };
        return;
      }
  
      const {
        cliente,
        email,
        telefono,
        direccion,
        fechaCreacion,
        revista,
        importe,
        comercial,
      } = ctx.request.body;
  
      await clientRef.update({
        cliente: cliente,
        email: email,
        telefono: telefono,
        direccion: direccion,
        fechaCreacion: fechaCreacion,
        revista: revista,
        importe: importe,
        comercial: comercial,
      });
  
      ctx.body = {
        message: "Cliente actualizado",
        client: {
          id: clientId,
          cliente: cliente,
          email: email,
          telefono: telefono,
          direccion: direccion,
          fechaCreacion: fechaCreacion,
          revista: revista,
          importe: importe,
          comercial: comercial,
        },
      };
    } catch (error) {
      console.error("Error en updateClient:", error);
      ctx.status = 400;
      ctx.body = {
        message: "Error actualizando el cliente",
        error: error.message,
      };
    }
  };