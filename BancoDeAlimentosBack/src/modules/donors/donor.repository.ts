
import { DonorModel, IDonor } from "./donor.model";

export class DonorRepository {

  // Crear donante
  async create(
    data: Partial<IDonor>
  ): Promise<IDonor> {
    return await DonorModel.create(data);
  }

  // Obtener todos los donantes
  async findAll(): Promise<IDonor[]> {
    return await DonorModel.find();
  }

  // Buscar donante por ID
  async findById(
    id: string
  ): Promise<IDonor | null> {
    return await DonorModel.findById(id);
  }

  // Buscar donante por email
  async findByEmail(
    email: string
  ): Promise<IDonor | null> {
    return await DonorModel.findOne({
      email: email.trim().toLowerCase()
    });
  }

  // Actualizar donante
  async update(
    id: string,
    data: Partial<IDonor>
  ): Promise<IDonor | null> {
    return await DonorModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    );
  }

  // Eliminar donante
  async delete(
    id: string
  ): Promise<IDonor | null> {
    return await DonorModel.findByIdAndDelete(id);
  }
}
