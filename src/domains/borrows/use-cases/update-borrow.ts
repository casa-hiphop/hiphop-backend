import { AppError } from "../../../shared/error/AppError"
import type { UpdateBorrowRequestDto } from "../dtos/update-borrow-request.dto"
import type { BorrowsRepositoryInterface } from "../repositories/borrows.repository.interface"
import { connection } from "../../../config/database"

export class UpdateBorrow {
  constructor(private borrowsRepository: BorrowsRepositoryInterface) {}

  async execute(id: string, data: UpdateBorrowRequestDto) {
    const borrow = await this.borrowsRepository.findById(id)

    if (!borrow) {
      throw new AppError("Borrow not found")
    }

    // Validar ferramenta se estiver sendo alterada
    if (data.tool_id) {
      const tool = await connection("tools").where("id", data.tool_id).first()
      if (!tool) {
        throw new AppError("Tool not found")
      }
    }

    // Validar unidade se estiver sendo alterada
    if (data.unit_id) {
      const unit = await connection("units").where("id", data.unit_id).first()
      if (!unit) {
        throw new AppError("Unit not found")
      }
    }

    // Validar solicitante se estiver sendo alterado
    if (data.requester_id) {
      const requester = await connection("requesters")
        .where("id", data.requester_id)
        .first()
      if (!requester) {
        throw new AppError("Requester not found")
      }
    }

    // Validar datas se estiverem sendo alteradas
    if (data.date && data.return_date) {
      const borrowDate = new Date(data.date)
      const returnDate = new Date(data.return_date)

      if (returnDate < borrowDate) {
        throw new AppError("Return date must be after borrow date")
      }
    }

    await this.borrowsRepository.update(id, data)
  }
}
