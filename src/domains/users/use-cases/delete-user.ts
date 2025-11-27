import { AppError } from "../../../shared/error/AppError"
import type { UsersRepositoryInterface } from "../repositories/users.interface"

interface DeleteUserUseCaseRequest {
  id: string
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ id }: DeleteUserUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.getById(id)

    if (!user) {
      throw new AppError("User not found", 404)
    }

    await this.usersRepository.delete(id)
  }
}