
import { Types } from "mongoose";
import { OrganizationRepository } from "./organization.repository";
import { IOrganization } from "./organization.model";
import { AppError } from "../../utils/AppError";

export class OrganizationService {

  private organizationRepository: OrganizationRepository;

  constructor() {
    this.organizationRepository = new OrganizationRepository();
  }

  // Crear organización
  async create(
    data: Partial<IOrganization>
  ): Promise<IOrganization> {

    if (!data.name?.trim() || !data.email?.trim()) {
      throw new AppError(
        400,
        "Nombre y correo son obligatorios"
      );
    }

    const email = data.email.trim().toLowerCase();

    const existing =
      await this.organizationRepository.findByEmail(email);

    if (existing) {
      throw new AppError(
        409,
        "Ya existe una organización con ese correo"
      );
    }

    return await this.organizationRepository.create({
      ...data,
      email
    });
  }

  // Obtener todas las organizaciones
  async findAll(): Promise<IOrganization[]> {
    return await this.organizationRepository.findAll();
  }

  // Obtener organización por ID
  async findById(id: string): Promise<IOrganization> {

    if (!Types.ObjectId.isValid(id)) {
      throw new AppError(400, "ID de organización inválido");
    }

    const organization =
      await this.organizationRepository.findById(id);

    if (!organization) {
      throw new AppError(404, "Organización no encontrada");
    }

    return organization;
  }

  // Actualizar organización
  async update(
    id: string,
    data: Partial<IOrganization>
  ): Promise<IOrganization> {

    await this.findById(id);

    if (data.name !== undefined && !data.name?.trim()) {
      throw new AppError(400, "El nombre no puede estar vacío");
    }

    if (data.email !== undefined) {

      if (!data.email?.trim()) {
        throw new AppError(400, "El correo no puede estar vacío");
      }

      const email = data.email.trim().toLowerCase();

      const existing =
        await this.organizationRepository.findByEmail(email);

      if (existing && existing.id !== id) {
        throw new AppError(
          409,
          "Ya existe otra organización con ese correo"
        );
      }

      data.email = email;
    }

    const updated =
      await this.organizationRepository.update(id, data);

    if (!updated) {
      throw new AppError(404, "Organización no encontrada");
    }

    return updated;
  }

  // Eliminar organización
  async delete(id: string): Promise<IOrganization> {

    await this.findById(id);

    const deleted =
      await this.organizationRepository.delete(id);

    if (!deleted) {
      throw new AppError(404, "Organización no encontrada");
    }

    return deleted;
  }
}
