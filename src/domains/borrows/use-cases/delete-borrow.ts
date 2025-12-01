import { AppError } from "../../../shared/error/AppError"
import type { BorrowsRepositoryInterface } from "../repositories/borrows.repository.interface"

export class DeleteBorrow {
  constructor(private borrowsRepository: BorrowsRepositoryInterface) {}

  async execute(id: string) {
    const borrow = await this.borrowsRepository.findById(id)

    if (!borrow) {
      throw new AppError("Borrow not found")
    }

    await this.borrowsRepository.delete(id)
  }
}
