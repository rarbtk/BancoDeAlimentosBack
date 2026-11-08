
import {
  DonationModel,
  IDonation
} from "./donation.model";

export class DonationRepository {

  // Crear donación
  async create(
    data: Partial<IDonation>
  ): Promise<IDonation> {
    return await DonationModel.create(data);
  }

  // Obtener todas las donaciones
  async findAll(): Promise<IDonation[]> {
    return await DonationModel.find();
  }

  // Buscar donación por ID
  async findById(
    id: string
  ): Promise<IDonation | null> {
    return await DonationModel.findById(id);
  }

  // Actualizar donación
  async update(
    id: string,
    data: Partial<IDonation>
  ): Promise<IDonation | null> {
    return await DonationModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    );
  }

  // Eliminar donación
  async delete(
    id: string
  ): Promise<IDonation | null> {
    return await DonationModel.findByIdAndDelete(id);
  }
}
