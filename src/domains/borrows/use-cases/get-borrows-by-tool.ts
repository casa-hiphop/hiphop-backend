import type { BorrowsRepositoryInterface } from "../repositories/borrows.repository.interface"
import type { BorrowResponseDto } from "../dtos/borrow-response.dto"
import { AppError } from "../../../shared/error/AppError"
import { connection } from "../../../config/database"

interface GetBorrowsByToolResponseDto {
  borrows: BorrowResponseDto[]
}

export class GetBorrowsByTool {
  constructor(private borrowsRepository: BorrowsRepositoryInterface) {}

  async execute(tool_id: string): Promise<GetBorrowsByToolResponseDto> {
    // Validar se a ferramenta existe
    const tool = await connection("tools").where("id", tool_id).first()
    if (!tool) {
      throw new AppError("Tool not found")
    }

    const borrows = await this.borrowsRepository.findByToolId(tool_id)
    return { borrows }
  }
}
