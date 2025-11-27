import type { UsersRepositoryInterface } from "../repositories/users.interface"
import type { UserResponseDto } from "../dtos/user/user-response.dto"

interface GetAllUsersUseCaseResponse {
  users: UserResponseDto[]
}

export class GetAllUsersUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute(): Promise<GetAllUsersUseCaseResponse> {
    const users = await this.usersRepository.findAll()

    return { users }
  }
}