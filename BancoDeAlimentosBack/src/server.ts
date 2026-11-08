
import dotenv from "dotenv";
import app from "./app";
import { connectDatabase } from "./config/database";

dotenv.config();

const PORT = Number(process.env.PORT) || 3001;

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log("========================================");
      console.log(" BANCO DE ALIMENTOS - BACKEND");
      console.log("========================================");
      console.log(`Servidor: http://localhost:${PORT}`);
      console.log(`Health: http://localhost:${PORT}/api/health`);
    });

  } catch (error) {
    console.error("No fue posible iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
