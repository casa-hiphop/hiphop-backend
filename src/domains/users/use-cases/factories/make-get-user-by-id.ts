import { UsersRepository } from "../../repositories/knex/users.repository"
import { GetUserByIdUseCase } from "../get-user-by-id"

export function makeGetUserById() {
  const usersRepository = new UsersRepository()
  const useCase = new GetUserByIdUseCase(usersRepository)

  return useCase
}