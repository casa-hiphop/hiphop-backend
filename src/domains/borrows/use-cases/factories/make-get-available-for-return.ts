import { BorrowsRepository } from "../../repositories/knex/borrows.repository"
import { GetAvailableForReturn } from "../get-available-for-return"

export function makeGetAvailableForReturn() {
  const borrowsRepository = new BorrowsRepository()
  const getAvailableForReturn = new GetAvailableForReturn(borrowsRepository)

  return getAvailableForReturn
}
