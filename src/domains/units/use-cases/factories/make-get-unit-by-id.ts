import { UnitsRepository } from "../../repositories/knex/units.repository"
import { GetUnitByIdUseCase } from "../get-unit-by-id"

export function makeGetUnitById() {
  const unitsRepository = new UnitsRepository()
  const getUnitById = new GetUnitByIdUseCase(unitsRepository)

  return getUnitById
}