import type { BorrowsRepositoryInterface } from "../repositories/borrows.repository.interface"
import type { BorrowResponseDto } from "../dtos/borrow-response.dto"

interface GetPendingBorrowsResponseDto {
  borrows: BorrowResponseDto[]
}

export class GetPendingBorrows {
  constructor(private borrowsRepository: BorrowsRepositoryInterface) {}

  async execute(): Promise<GetPendingBorrowsResponseDto> {
    const borrows = await this.borrowsRepository.findPending()
    return { borrows }
  }
}
