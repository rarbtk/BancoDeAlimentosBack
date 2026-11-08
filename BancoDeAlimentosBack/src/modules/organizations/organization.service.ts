
import { Types } from "mongoose";
import { OrganizationRepository } from "./organization.repository";
import { IOrganization } from "./organization.model";

export class OrganizationService {

  private organizationRepository: OrganizationRepository;

  constructor() {
    this.organizationRepository = new OrganizationRepository();
  }

  // Crear una organización
  async create(
    data: Partial<IOrganization>
  ): Promise<IOrganization> {

    if (!data.name || !data.email) {
      throw new Error("Nombre y correo son obligatorios");
    }

    // Verificar si ya existe el correo
    const organizations =
      await this.organizationRepository.findAll();

    const existingOrganization = organizations.find(
      org => org.email === data.email?.trim().toLowerCase()
    );

    if (existingOrganization) {
      throw new Error("Ya existe una organización con ese correo");
    }

    return await this.organizationRepository.create(data);
  }

  // Obtener todas las organizaciones
  async findAll(): Promise<IOrganization[]> {
    return await this.organizationRepository.findAll();
  }

  // Buscar organización por ID
  async findById(id: string): Promise<IOrganization> {

    if (!Types.ObjectId.isValid(id)) {
      throw new Error("ID de organización inválido");
    }

    const organization =
      await this.organizationRepository.findById(id);

    if (!organization) {
      throw new Error("Organización no encontrada");
    }

    return organization;
  }

  // Actualizar organización
  async update(
    id: string,
    data: Partial<IOrganization>
  ): Promise<IOrganization> {

    // Comprobar que existe
    await this.findById(id);

    const updatedOrganization =
      await this.organizationRepository.update(id, data);

    if (!updatedOrganization) {
      throw new Error("No se pudo actualizar la organización");
    }

    return updatedOrganization;
  }

  // Eliminar organización
  async delete(id: string): Promise<IOrganization> {

    // Comprobar que existe
    await this.findById(id);

    const deletedOrganization =
      await this.organizationRepository.delete(id);

    if (!deletedOrganization) {
      throw new Error("No se pudo eliminar la organización");
    }

    return deletedOrganization;
  }
}
