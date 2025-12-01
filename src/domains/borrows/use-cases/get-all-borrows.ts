import type { BorrowsRepositoryInterface } from "../repositories/borrows.repository.interface"
import type { BorrowResponseDto } from "../dtos/borrow-response.dto"

interface GetAllBorrowsResponseDto {
  borrows: BorrowResponseDto[]
}

export class GetAllBorrows {
  constructor(private borrowsRepository: BorrowsRepositoryInterface) {}

  async execute(): Promise<GetAllBorrowsResponseDto> {
    const borrows = await this.borrowsRepository.findAll()
    return { borrows }
  }
}
