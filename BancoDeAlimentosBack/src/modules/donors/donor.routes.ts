
import { Router } from "express";
import { DonorController } from "./donor.controller";

const router = Router();

const donorController = new DonorController();

// Crear donante
router.post("/", donorController.create);

// Obtener todos los donantes
router.get("/", donorController.findAll);

// Obtener donante por ID
router.get("/:id", donorController.findById);

// Actualizar donante
router.put("/:id", donorController.update);

// Desactivar donante
router.delete("/:id", donorController.delete);

export default router;
