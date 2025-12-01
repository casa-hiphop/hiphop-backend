import { connection } from "../../../../config/database"
import type { CreateBorrowRequestDto } from "../../dtos/create-borrow-request.dto"
import type { BorrowResponseDto } from "../../dtos/borrow-response.dto"
import type { BorrowsRepositoryInterface } from "../borrows.repository.interface"
import type { UpdateBorrowRequestDto } from "../../dtos/update-borrow-request.dto"

export class BorrowsRepository implements BorrowsRepositoryInterface {
  async create(data: CreateBorrowRequestDto): Promise<void> {
    await connection("borrows").insert(data)
  }

  async findAll(): Promise<BorrowResponseDto[]> {
    const borrows = await connection("borrows")
      .select("*")
      .orderBy("created_at", "desc")

    return borrows
  }

  async findById(id: string): Promise<BorrowResponseDto | null> {
    const borrow = await connection("borrows").where("id", id).first()

    return borrow
  }

  async findByToolId(tool_id: string): Promise<BorrowResponseDto[]> {
    const borrows = await connection("borrows")
      .where("tool_id", tool_id)
      .orderBy("created_at", "desc")

    return borrows
  }

  async findByRequesterId(requester_id: string): Promise<BorrowResponseDto[]> {
    const borrows = await connection("borrows")
      .where("requester_id", requester_id)
      .orderBy("created_at", "desc")

    return borrows
  }

  async findPending(): Promise<BorrowResponseDto[]> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString().split("T")[0]

    const borrows = await connection("borrows")
      .whereNull("returned_at")
      .whereRaw("return_date >= ?", [todayStr])
      .orderBy("return_date", "asc")

    return borrows
  }

  async findOverdue(): Promise<BorrowResponseDto[]> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString().split("T")[0]

    const borrows = await connection("borrows")
      .whereNull("returned_at")
      .whereRaw("return_date < ?", [todayStr])
      .orderBy("return_date", "asc")

    return borrows
  }

  async findPendingByToolId(tool_id: string): Promise<BorrowResponseDto[]> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString().split("T")[0]

    const borrows = await connection("borrows")
      .where("tool_id", tool_id)
      .whereNull("returned_at")
      .whereRaw("return_date >= ?", [todayStr])
      .orderBy("return_date", "asc")

    return borrows
  }

  async findAvailableForReturn(): Promise<BorrowResponseDto[]> {
    const borrows = await connection("borrows")
      .where("returned_at", null)
      .orderBy("return_date", "asc")

    return borrows
  }

  async update(id: string, data: UpdateBorrowRequestDto): Promise<void> {
    await connection("borrows")
      .where("id", id)
      .update({
        ...data,
        updated_at: new Date(),
      })
  }

  async returnBorrow(id: string, returned_at: Date): Promise<void> {
    await connection("borrows")
      .where("id", id)
      .update({
        returned_at: returned_at.toISOString().split("T")[0],
        updated_at: new Date(),
      })
  }

  async delete(id: string): Promise<void> {
    await connection("borrows").where("id", id).delete()
  }
}
