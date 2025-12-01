import { BorrowsRepository } from "../../repositories/knex/borrows.repository"
import { GetAllBorrows } from "../get-all-borrows"

export function makeGetAllBorrows() {
  const borrowsRepository = new BorrowsRepository()
  const getAllBorrows = new GetAllBorrows(borrowsRepository)

  return getAllBorrows
}
