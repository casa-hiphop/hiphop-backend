import { AppError } from "../../../shared/error/AppError"
import type { BorrowsRepositoryInterface } from "../repositories/borrows.repository.interface"
import type { BorrowResponseDto } from "../dtos/borrow-response.dto"

interface GetBorrowByIdResponseDto {
  borrow: BorrowResponseDto
}

export class GetBorrowById {
  constructor(private borrowsRepository: BorrowsRepositoryInterface) {}

  async execute(id: string): Promise<GetBorrowByIdResponseDto> {
    const borrow = await this.borrowsRepository.findById(id)

    if (!borrow) {
      throw new AppError("Borrow not found")
    }

    return { borrow }
  }
}
