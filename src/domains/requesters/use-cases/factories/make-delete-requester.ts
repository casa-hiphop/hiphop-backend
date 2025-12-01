import { RequestersRepository } from "../../repositories/knex/requesters.repository"
import { DeleteRequester } from "../delete-requester"

export function makeDeleteRequester() {
  const requestersRepository = new RequestersRepository()
  const deleteRequester = new DeleteRequester(requestersRepository)

  return deleteRequester
}
