import type { BorrowsRepositoryInterface } from "../repositories/borrows.repository.interface"
import type { BorrowResponseDto } from "../dtos/borrow-response.dto"

interface GetOverdueBorrowsResponseDto {
  borrows: BorrowResponseDto[]
}

export class GetOverdueBorrows {
  constructor(private borrowsRepository: BorrowsRepositoryInterface) {}

  async execute(): Promise<GetOverdueBorrowsResponseDto> {
    const borrows = await this.borrowsRepository.findOverdue()
    return { borrows }
  }
}
