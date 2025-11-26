import type { UnitsRepositoryInterface } from "../repositories/units.repository.interface"
import type { UnitResponseDto } from "../dtos/unit-response.dto"
import { AppError } from "../../../shared/error/AppError"

interface GetUnitByIdUseCaseRequest {
  id: string
}

interface GetUnitByIdUseCaseResponse {
  unit: UnitResponseDto
}

export class GetUnitByIdUseCase {
  constructor(private unitsRepository: UnitsRepositoryInterface) {}

  async execute({ id }: GetUnitByIdUseCaseRequest): Promise<GetUnitByIdUseCaseResponse> {
    const unit = await this.unitsRepository.findById(id)

    if (!unit) {
      throw new AppError("Unit not found", 404)
    }

    return { unit }
  }
}