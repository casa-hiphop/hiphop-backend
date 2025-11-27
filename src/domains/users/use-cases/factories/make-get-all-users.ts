import { UsersRepository } from "../../repositories/knex/users.repository"
import { GetAllUsersUseCase } from "../get-all-users"

export function makeGetAllUsers() {
  const usersRepository = new UsersRepository()
  const useCase = new GetAllUsersUseCase(usersRepository)

  return useCase
}