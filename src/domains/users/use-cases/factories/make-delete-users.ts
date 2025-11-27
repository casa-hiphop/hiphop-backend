import { UsersRepository } from "../../repositories/knex/users.repository"
import { DeleteUserUseCase } from "../delete-user"

export function makeDeleteUser() {
  const usersRepository = new UsersRepository()
  const useCase = new DeleteUserUseCase(usersRepository)

  return useCase
}