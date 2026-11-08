
import express, { Application, Request, Response } from "express";
import cors from "cors";

import organizationRoutes from "./modules/organizations/organization.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app: Application = express();

// Middlewares generales
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}));

// Endpoint para verificar el servidor
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "API Banco de Alimentos funcionando correctamente"
  });
});

// Rutas de organizaciones
app.use("/api/organizations", organizationRoutes);

// Middleware global de errores
// Debe registrarse después de las rutas
app.use(errorMiddleware);

export default app;
