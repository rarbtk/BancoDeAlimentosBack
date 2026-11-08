
import { Request, Response, NextFunction } from "express";
import { DonorService } from "./donor.service";

export class DonorController {

  private donorService: DonorService;

  constructor() {
    this.donorService = new DonorService();
  }

  // Crear donante
  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const donor = await this.donorService.create(req.body);

      res.status(201).json(donor);
    } catch (error) {
      next(error);
    }
  };

  // Obtener todos los donantes
  findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const donors = await this.donorService.findAll();

      res.status(200).json(donors);
    } catch (error) {
      next(error);
    }
  };

  // Obtener donante por ID
  findById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const donor = await this.donorService.findById(
        req.params.id
      );

      res.status(200).json(donor);
    } catch (error) {
      next(error);
    }
  };

  // Actualizar donante
  update = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const donor = await this.donorService.update(
        req.params.id,
        req.body
      );

      res.status(200).json(donor);
    } catch (error) {
      next(error);
    }
  };

  // Desactivar donante (baja lógica)
  delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const donor = await this.donorService.delete(
        req.params.id
      );

      res.status(200).json({
        message: "Donante desactivado correctamente",
        donor
      });
    } catch (error) {
      next(error);
    }
  };
}
