import type { UnitsRepositoryInterface } from "../repositories/units.repository.interface"
import type { UnitResponseDto } from "../dtos/unit-response.dto"

interface GetAllUnitsResponseDto {
    units: UnitResponseDto[]
}

export class GetAllUnitsCase {
    constructor(private unitsRepository: UnitsRepositoryInterface) {}

    async execute(): Promise<GetAllUnitsResponseDto> {
        const units = await this.unitsRepository.findAll()
        return { units }
    }
}