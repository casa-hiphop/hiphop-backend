import { BorrowsRepository } from "../../repositories/knex/borrows.repository"
import { GetBorrowsByTool } from "../get-borrows-by-tool"

export function makeGetBorrowsByTool() {
  const borrowsRepository = new BorrowsRepository()
  const getBorrowsByTool = new GetBorrowsByTool(borrowsRepository)

  return getBorrowsByTool
}
