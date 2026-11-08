
import { Types } from "mongoose";
import { DonorRepository } from "./donor.repository";
import { IDonor } from "./donor.model";
import { AppError } from "../../utils/AppError";

export class DonorService {

  private donorRepository: DonorRepository;

  constructor() {
    this.donorRepository = new DonorRepository();
  }

  // Crear un donante
  async create(data: Partial<IDonor>): Promise<IDonor> {

    if (
      !data.name?.trim() ||
      !data.email?.trim() ||
      !data.phone?.trim() ||
      !data.type
    ) {
      throw new AppError(
        400,
        "Nombre, correo, teléfono y tipo son obligatorios"
      );
    }

    const email = data.email.trim().toLowerCase();

    const existing =
      await this.donorRepository.findByEmail(email);

    if (existing) {
      throw new AppError(
        409,
        "Ya existe un donante con ese correo electrónico"
      );
    }

    return await this.donorRepository.create({
      ...data,
      email
    });
  }

  // Obtener todos los donantes
  async findAll(): Promise<IDonor[]> {
    return await this.donorRepository.findAll();
  }

  // Buscar donante por ID
  async findById(id: string): Promise<IDonor> {

    if (!Types.ObjectId.isValid(id)) {
      throw new AppError(400, "ID de donante inválido");
    }

    const donor = await this.donorRepository.findById(id);

    if (!donor) {
      throw new AppError(404, "Donante no encontrado");
    }

    return donor;
  }

  // Actualizar donante
  async update(
    id: string,
    data: Partial<IDonor>
  ): Promise<IDonor> {

    await this.findById(id);

    if (data.name !== undefined && !data.name?.trim()) {
      throw new AppError(400, "El nombre no puede estar vacío");
    }

    if (data.phone !== undefined && !data.phone?.trim()) {
      throw new AppError(400, "El teléfono no puede estar vacío");
    }

    if (data.email !== undefined) {

      if (!data.email?.trim()) {
        throw new AppError(400, "El correo no puede estar vacío");
      }

      const email = data.email.trim().toLowerCase();

      const existing =
        await this.donorRepository.findByEmail(email);

            if (existing && existing._id.toString() !== id) {
        throw new AppError(
          409,
          "Ya existe otro donante con ese correo"
        );
      }

      data.email = email;
    }

    const updated = await this.donorRepository.update(id, data);

    if (!updated) {
      throw new AppError(404, "Donante no encontrado");
    }

    return updated;
  }

  // Desactivar donante (eliminación lógica)
  async delete(id: string): Promise<IDonor> {

    const donor = await this.findById(id);

    if (!donor.active) {
      throw new AppError(
        400,
        "El donante ya se encuentra desactivado"
      );
    }

    const updated = await this.donorRepository.update(
      id,
      { active: false }
    );

    if (!updated) {
      throw new AppError(404, "Donante no encontrado");
    }

    return updated;
  }

  // Verificar que el donante existe y está activo
  async validateActiveDonor(id: string): Promise<IDonor> {

    const donor = await this.findById(id);

    if (!donor.active) {
      throw new AppError(
        400,
        "No se pueden registrar donaciones de un donante inactivo"
      );
    }

    return donor;
  }
}
