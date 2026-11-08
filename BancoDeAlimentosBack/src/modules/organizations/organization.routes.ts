
import { Router } from "express";
import { OrganizationController } from "./organization.controller";

const router = Router();
const organizationController = new OrganizationController();

// Crear una organización
router.post("/", organizationController.create);

// Obtener todas las organizaciones
router.get("/", organizationController.findAll);

// Obtener una organización por ID
router.get("/:id", organizationController.findById);

// Actualizar una organización
router.put("/:id", organizationController.update);

// Eliminar una organización
router.delete("/:id", organizationController.delete);

export default router;
