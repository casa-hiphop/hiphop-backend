import { RequestersRepository } from "../../repositories/knex/requesters.repository"
import { GetAllRequesters } from "../get-all-requesters"

export function makeGetAllRequesters() {
  const requestersRepository = new RequestersRepository()
  const getAllRequesters = new GetAllRequesters(requestersRepository)

  return getAllRequesters
}

