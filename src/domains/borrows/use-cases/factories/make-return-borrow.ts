import { BorrowsRepository } from "../../repositories/knex/borrows.repository"
import { ReturnBorrow } from "../return-borrow"

export function makeReturnBorrow() {
  const borrowsRepository = new BorrowsRepository()
  const returnBorrow = new ReturnBorrow(borrowsRepository)

  return returnBorrow
}
