import { connection } from "../../../../config/database"
import type { CreateUnitRequestDto } from "../../dtos/create-unit-request.dto"
import type { UnitResponseDto } from "../../dtos/unit-response.dto"
import type { UnitsRepositoryInterface } from "../units.repository.interface"
import type { UpdateUnitRequestDto } from "../../dtos/update-unit-request.dto"

export class UnitsRepository implements UnitsRepositoryInterface {
  async create(data: CreateUnitRequestDto): Promise<void> {
    await connection("units").insert(data)
  }

  async getUnitByCepAndNumber(
    cep: string,
    number: string,
  ): Promise<UnitResponseDto | null> {
    const unit = await connection("units")
      .where("cep", cep)
      .where("number", number)
      .first()

    return unit
  }

  async findAll(): Promise<UnitResponseDto[]> {
    const units = await connection("units")
      .select("*")
      .orderBy("created_at", "desc")

    return units
  }

  async findById(id: string): Promise<UnitResponseDto | null> {
    const unit = await connection("units").where("id", id).first()

    return unit
  }

  async update(id: string, data: UpdateUnitRequestDto): Promise<void> {
    await connection("units").where("id", id).update({
      ...data,
      updated_at: new Date()
    })
  }

  async delete(id: string): Promise<void> {
    await connection("units").where("id", id).delete()
  }
}
