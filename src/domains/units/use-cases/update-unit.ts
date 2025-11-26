import type { UnitsRepositoryInterface } from "../repositories/units.repository.interface"
import type { UpdateUnitRequestDto } from "../dtos/update-unit-request.dto"
import { AppError } from "../../../shared/error/AppError"

interface UpdateUnitUseCaseRequest extends UpdateUnitRequestDto {
  id: string
}

export class UpdateUnitUseCase {
  constructor(private unitsRepository: UnitsRepositoryInterface) {}

  async execute({ id, ...data }: UpdateUnitUseCaseRequest): Promise<void> {
    const unitExists = await this.unitsRepository.findById(id)

    if (!unitExists) {  
      throw new AppError("Unit not found", 404)
    }

    await this.unitsRepository.update(id, data)
  }
}