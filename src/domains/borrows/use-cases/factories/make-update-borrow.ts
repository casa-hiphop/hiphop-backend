import { BorrowsRepository } from "../../repositories/knex/borrows.repository"
import { UpdateBorrow } from "../update-borrow"

export function makeUpdateBorrow() {
  const borrowsRepository = new BorrowsRepository()
  const updateBorrow = new UpdateBorrow(borrowsRepository)

  return updateBorrow
}
