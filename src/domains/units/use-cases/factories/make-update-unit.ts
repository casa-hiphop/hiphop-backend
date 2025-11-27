import { UnitsRepository } from "../../repositories/knex/units.repository"
import { UpdateUnitUseCase } from "../update-unit"

export function makeUpdateUnit() {
  const unitsRepository = new UnitsRepository()
  const updateUnitUseCase = new UpdateUnitUseCase(unitsRepository)

  return updateUnitUseCase
}   