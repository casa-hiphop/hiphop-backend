import { BorrowsRepository } from "../../repositories/knex/borrows.repository"
import { GetPendingBorrows } from "../get-pending-borrows"

export function makeGetPendingBorrows() {
  const borrowsRepository = new BorrowsRepository()
  const getPendingBorrows = new GetPendingBorrows(borrowsRepository)

  return getPendingBorrows
}
