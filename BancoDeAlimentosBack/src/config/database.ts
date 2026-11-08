import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error("MONGO_URI no está configurada en .env");
  }

  try {
    await mongoose.connect(mongoURI);

    console.log("MongoDB conectado correctamente");
    console.log(`Base de datos: ${mongoose.connection.name}`);

  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    throw error;
  }
};
