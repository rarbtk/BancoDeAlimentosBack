
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { AppError } from "../utils/AppError";

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  // Errores de negocio personalizados
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message
    });
    return;
  }

  // Errores de validación de Mongoose
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      message: "Error de validación",
      details: Object.values(error.errors).map(
        err => err.message
      )
    });
    return;
  }

  // Identificadores o valores inválidos
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({
      message: "Identificador o valor inválido"
    });
    return;
  }

  // Índices únicos duplicados en MongoDB
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  ) {
    res.status(409).json({
      message: "Ya existe un registro con ese valor único"
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    message: "Error interno del servidor"
  });
};
