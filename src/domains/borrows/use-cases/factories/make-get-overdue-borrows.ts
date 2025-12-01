import { BorrowsRepository } from "../../repositories/knex/borrows.repository"
import { GetOverdueBorrows } from "../get-overdue-borrows"

export function makeGetOverdueBorrows() {
  const borrowsRepository = new BorrowsRepository()
  const getOverdueBorrows = new GetOverdueBorrows(borrowsRepository)

  return getOverdueBorrows
}
