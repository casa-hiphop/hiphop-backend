import { UnitsRepository } from "../../repositories/knex/units.repository"
import { GetAllUnitsCase } from "../get-all-units"

export function makeGetAllUnits() {
  const unitsRepository = new UnitsRepository()
  const useCase = new GetAllUnitsCase(unitsRepository)

  return useCase
}