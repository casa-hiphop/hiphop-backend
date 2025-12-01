import { AppError } from "../../../shared/error/AppError"
import type { BorrowsRepositoryInterface } from "../repositories/borrows.repository.interface"

export class ReturnBorrow {
  constructor(private borrowsRepository: BorrowsRepositoryInterface) {}

  async execute(id: string, returned_at?: Date) {
    const borrow = await this.borrowsRepository.findById(id)

    if (!borrow) {
      throw new AppError("Borrow not found")
    }

    if (borrow.returned_at) {
      throw new AppError("Borrow has already been returned")
    }

    const returnDate = returned_at || new Date()

    await this.borrowsRepository.returnBorrow(id, returnDate)
  }
}
