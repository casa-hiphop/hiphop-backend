import { connection } from "../../../../config/database"
import type { CreateRequesterRequestDto } from "../../dtos/create-requester-request.dto"
import type { RequesterResponseDto } from "../../dtos/requester-response.dto"
import type { RequestersRepositoryInterface } from "../requesters.repository.interface"
import type { UpdateRequesterRequestDto } from "../../dtos/update-requester-request.dto"

export class RequestersRepository implements RequestersRepositoryInterface {
  async create(data: CreateRequesterRequestDto): Promise<void> {
    await connection("requesters").insert(data)
  }

  async findAll(): Promise<RequesterResponseDto[]> {
    const requesters = await connection("requesters")
      .select("*")
      .orderBy("created_at", "desc")

    return requesters
  }

  async findById(id: string): Promise<RequesterResponseDto | null> {
    const requester = await connection("requesters").where("id", id).first()

    return requester
  }

  async findByEmail(email: string): Promise<RequesterResponseDto | null> {
    const requester = await connection("requesters")
      .where("email", email)
      .first()

    return requester
  }

  async update(id: string, data: UpdateRequesterRequestDto): Promise<void> {
    await connection("requesters")
      .where("id", id)
      .update({
        ...data,
        updated_at: new Date(),
      })
  }

  async delete(id: string): Promise<void> {
    await connection("requesters").where("id", id).delete()
  }
}
