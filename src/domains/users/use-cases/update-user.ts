import { AppError } from "../../../shared/error/AppError"
import { genarateHash } from "../../../shared/utils/encrypt"
import type { UsersRepositoryInterface } from "../repositories/users.interface"
import type { UpdateUserRequestDto } from "../dtos/user/update-user-request.dto"

interface UpdateUserUseCaseRequest {
  id: string
  name?: string | undefined
  email?: string | undefined
  password?: string | undefined
  status?: boolean | undefined
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ id, ...data }: UpdateUserUseCaseRequest): Promise<void> {
    const userExists = await this.usersRepository.getById(id)

    if (!userExists) {
      throw new AppError("User not found", 404)
    }

    // Se está atualizando o email, verifica se não está em uso
    if (data.email && data.email !== userExists.email) {
      const emailInUse = await this.usersRepository.getUserByEmail(data.email)
      
      if (emailInUse) {
        throw new AppError("Email already in use", 400)
      }
    }

    // Remove campos undefined e faz hash da senha se fornecida
    const updateData: UpdateUserRequestDto = {}
    
    if (data.name !== undefined) updateData.name = data.name
    if (data.email !== undefined) updateData.email = data.email
    if (data.password !== undefined) {
      updateData.password = await genarateHash(data.password)
    }
    if (data.status !== undefined) updateData.status = data.status

    await this.usersRepository.update(id, updateData)
  }
}