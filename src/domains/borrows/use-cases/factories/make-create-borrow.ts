import { BorrowsRepository } from "../../repositories/knex/borrows.repository"
import { CreateBorrow } from "../create-borrow"

export function makeCreateBorrow() {
  const borrowsRepository = new BorrowsRepository()
  const createBorrow = new CreateBorrow(borrowsRepository)

  return createBorrow
}
