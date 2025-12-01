import { RequestersRepository } from "../../repositories/knex/requesters.repository"
import { UpdateRequester } from "../update-requester"

export function makeUpdateRequester() {
  const requestersRepository = new RequestersRepository()
  const updateRequester = new UpdateRequester(requestersRepository)

  return updateRequester
}

