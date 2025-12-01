import type { BorrowsRepositoryInterface } from "../repositories/borrows.repository.interface"
import type { BorrowResponseDto } from "../dtos/borrow-response.dto"

interface GetAvailableForReturnResponseDto {
  borrows: BorrowResponseDto[]
}

export class GetAvailableForReturn {
  constructor(private borrowsRepository: BorrowsRepositoryInterface) {}

  async execute(): Promise<GetAvailableForReturnResponseDto> {
    const borrows = await this.borrowsRepository.findAvailableForReturn()
    return { borrows }
  }
}
