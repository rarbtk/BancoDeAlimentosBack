
import {
  OrganizationModel,
  IOrganization
} from "./organization.model";

export class OrganizationRepository {

  // Crear una organización
  async create(
    data: Partial<IOrganization>
  ): Promise<IOrganization> {
    return await OrganizationModel.create(data);
  }

  // Obtener todas las organizaciones
  async findAll(): Promise<IOrganization[]> {
    return await OrganizationModel.find();
  }

  // Buscar una organización por ID
  async findById(
    id: string
  ): Promise<IOrganization | null> {
    return await OrganizationModel.findById(id);
  }

  // Actualizar una organización
  async update(
    id: string,
    data: Partial<IOrganization>
  ): Promise<IOrganization | null> {
    return await OrganizationModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    );
  }

  // Eliminar una organización
  async delete(
    id: string
  ): Promise<IOrganization | null> {
    return await OrganizationModel.findByIdAndDelete(id);
  }
}
