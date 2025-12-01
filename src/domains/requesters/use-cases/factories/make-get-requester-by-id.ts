import { RequestersRepository } from "../../repositories/knex/requesters.repository"
import { GetRequesterById } from "../get-requester-by-id"

export function makeGetRequesterById() {
  const requestersRepository = new RequestersRepository()
  const getRequesterById = new GetRequesterById(requestersRepository)

  return getRequesterById
}
