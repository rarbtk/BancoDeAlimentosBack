
import { Types } from "mongoose";
import { DonationRepository } from "./donation.repository";
import { IDonation } from "./donation.model";
import { AppError } from "../../utils/AppError";

export class DonationService {

  private donationRepository: DonationRepository;

  constructor() {
    this.donationRepository = new DonationRepository();
  }

  // Validar datos de la donación
  private validateDonation(data: Partial<IDonation>): void {

    if (data.product !== undefined && !data.product.trim()) {
      throw new AppError(400, "El producto no puede estar vacío");
    }

    if (
      data.quantity !== undefined &&
      (!Number.isInteger(data.quantity) || data.quantity <= 0)
    ) {
      throw new AppError(
        400,
        "La cantidad debe ser un número entero mayor que cero"
      );
    }

    if (data.expirationDate !== undefined) {

      const expirationDate = new Date(data.expirationDate);

      if (isNaN(expirationDate.getTime())) {
        throw new AppError(400, "Fecha de vencimiento inválida");
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (expirationDate < today) {
        throw new AppError(
          400,
          "No se pueden registrar alimentos vencidos"
        );
      }
    }

    if (
      data.donorId !== undefined &&
      !Types.ObjectId.isValid(String(data.donorId))
    ) {
      throw new AppError(400, "ID de donante inválido");
    }
  }

  // Crear una donación
  async create(data: Partial<IDonation>): Promise<IDonation> {

    if (
      !data.donorId ||
      !data.product ||
      data.quantity === undefined ||
      !data.expirationDate
    ) {
      throw new AppError(
        400,
        "Donante, producto, cantidad y vencimiento son obligatorios"
      );
    }

    this.validateDonation(data);

    return await this.donationRepository.create(data);
  }

  // Obtener todas las donaciones
  async findAll(): Promise<IDonation[]> {
    return await this.donationRepository.findAll();
  }

  // Buscar una donación por ID
  async findById(id: string): Promise<IDonation> {

    if (!Types.ObjectId.isValid(id)) {
      throw new AppError(400, "ID de donación inválido");
    }

    const donation = await this.donationRepository.findById(id);

    if (!donation) {
      throw new AppError(404, "Donación no encontrada");
    }

    return donation;
  }

  // Actualizar una donación
  async update(
    id: string,
    data: Partial<IDonation>
  ): Promise<IDonation> {

    await this.findById(id);

    this.validateDonation(data);

    const updated = await this.donationRepository.update(id, data);

    if (!updated) {
      throw new AppError(404, "Donación no encontrada");
    }

    return updated;
  }

  // Eliminar una donación
  async delete(id: string): Promise<IDonation> {

    await this.findById(id);

    const deleted = await this.donationRepository.delete(id);

    if (!deleted) {
      throw new AppError(404, "Donación no encontrada");
    }

    return deleted;
  }
}
