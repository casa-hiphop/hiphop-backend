import { UsersRepository } from "../../repositories/knex/users.repository"
import { UpdateUserUseCase } from "../update-user"

export function makeUpdateUser() {
  const usersRepository = new UsersRepository()
  const useCase = new UpdateUserUseCase(usersRepository)

  return useCase
}