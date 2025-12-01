import { RequestersRepository } from "../../repositories/knex/requesters.repository"
import { CreateRequester } from "../create-requester"

export function makeCreateRequester() {
  const requestersRepository = new RequestersRepository()
  const createRequester = new CreateRequester(requestersRepository)

  return createRequester
}
