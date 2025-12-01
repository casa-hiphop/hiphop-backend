import { BorrowsRepository } from "../../repositories/knex/borrows.repository"
import { GetBorrowById } from "../get-borrow-by-id"

export function makeGetBorrowById() {
  const borrowsRepository = new BorrowsRepository()
  const getBorrowById = new GetBorrowById(borrowsRepository)

  return getBorrowById
}
