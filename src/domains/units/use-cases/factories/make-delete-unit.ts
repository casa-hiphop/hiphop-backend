import { UnitsRepository } from "../../repositories/knex/units.repository"
import { DeleteUnitUseCase } from "../delete-unit"

export function makeDeleteUnit() {
  const unitsRepository = new UnitsRepository()
  const deleteUnitUseCase = new DeleteUnitUseCase(unitsRepository)

  return deleteUnitUseCase  
}