import { BorrowsRepository } from "../../repositories/knex/borrows.repository"
import { DeleteBorrow } from "../delete-borrow"

export function makeDeleteBorrow() {
  const borrowsRepository = new BorrowsRepository()
  const deleteBorrow = new DeleteBorrow(borrowsRepository)

  return deleteBorrow
}
