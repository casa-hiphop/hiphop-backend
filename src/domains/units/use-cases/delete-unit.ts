import type { UnitsRepositoryInterface } from "../repositories/units.repository.interface"
import { AppError } from "../../../shared/error/AppError"

interface DeleteUnitUseCaseRequest {
  id: string
}

export class DeleteUnitUseCase {
  constructor(private unitsRepository: UnitsRepositoryInterface) {}

  async execute({ id }: DeleteUnitUseCaseRequest): Promise<void> {
    const unit = await this.unitsRepository.findById(id)

    if (!unit) {
      throw new AppError("Unit not found", 404)
    }

    await this.unitsRepository.delete(id)
  }
}