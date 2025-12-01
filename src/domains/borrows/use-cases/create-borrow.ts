import { AppError } from "../../../shared/error/AppError"
import type { CreateBorrowRequestDto } from "../dtos/create-borrow-request.dto"
import type { BorrowsRepositoryInterface } from "../repositories/borrows.repository.interface"
import { connection } from "../../../config/database"

export class CreateBorrow {
  constructor(private borrowsRepository: BorrowsRepositoryInterface) {}

  async execute(data: CreateBorrowRequestDto) {
    // Validar se a ferramenta existe
    const tool = await connection("tools").where("id", data.tool_id).first()
    if (!tool) {
      throw new AppError("Tool not found")
    }

    // Validar se a unidade existe
    const unit = await connection("units").where("id", data.unit_id).first()
    if (!unit) {
      throw new AppError("Unit not found")
    }

    // Validar se o solicitante existe
    const requester = await connection("requesters")
      .where("id", data.requester_id)
      .first()
    if (!requester) {
      throw new AppError("Requester not found")
    }

    // Validar se a ferramenta tem quantidade disponível
    const pendingBorrows = await this.borrowsRepository.findPendingByToolId(
      data.tool_id,
    )
    const borrowedQuantity = pendingBorrows.length

    if (borrowedQuantity >= tool.quantity) {
      throw new AppError("Tool is not available (all units are borrowed)")
    }

    // Validar datas
    const borrowDate = new Date(data.date)
    const returnDate = new Date(data.return_date)

    if (returnDate < borrowDate) {
      throw new AppError("Return date must be after borrow date")
    }

    await this.borrowsRepository.create(data)
  }
}
