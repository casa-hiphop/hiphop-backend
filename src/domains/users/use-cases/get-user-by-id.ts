import { AppError } from "../../../shared/error/AppError"
import type { UsersRepositoryInterface } from "../repositories/users.interface"
import type { UserResponseDto } from "../dtos/user/user-response.dto"

interface GetUserByIdUseCaseRequest {
  id: string
}

interface GetUserByIdUseCaseResponse {
  user: UserResponseDto
}

export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ id }: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
    const user = await this.usersRepository.getById(id)

    if (!user) {
      throw new AppError("User not found", 404)
    }

    return { user }
  }
}