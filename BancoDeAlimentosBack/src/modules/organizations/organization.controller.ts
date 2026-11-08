
import { Request, Response, NextFunction } from "express";
import { OrganizationService } from "./organization.service";

export class OrganizationController {

  private organizationService: OrganizationService;

  constructor() {
    this.organizationService = new OrganizationService();
  }

  // Crear organización
  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const organization =
        await this.organizationService.create(req.body);

      res.status(201).json(organization);
    } catch (error) {
      next(error);
    }
  };

  // Obtener todas las organizaciones
  findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const organizations =
        await this.organizationService.findAll();

      res.status(200).json(organizations);
    } catch (error) {
      next(error);
    }
  };

  // Obtener organización por ID
  findById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const organization =
        await this.organizationService.findById(req.params.id);

      res.status(200).json(organization);
    } catch (error) {
      next(error);
    }
  };

  // Actualizar organización
  update = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const organization =
        await this.organizationService.update(
          req.params.id,
          req.body
        );

      res.status(200).json(organization);
    } catch (error) {
      next(error);
    }
  };

  // Eliminar organización
  delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.organizationService.delete(req.params.id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
