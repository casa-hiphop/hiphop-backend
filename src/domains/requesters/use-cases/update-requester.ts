import { AppError } from "../../../shared/error/AppError"
import type { UpdateRequesterRequestDto } from "../dtos/update-requester-request.dto"
import type { RequestersRepositoryInterface } from "../repositories/requesters.repository.interface"

export class UpdateRequester {
  constructor(private requestersRepository: RequestersRepositoryInterface) {}

  async execute(id: string, data: UpdateRequesterRequestDto) {
    const requester = await this.requestersRepository.findById(id)

    if (!requester) {
      throw new AppError("Requester not found")
    }

    // Verifica se o email já está em uso por outro requester
    if (data.email !== requester.email) {
      const emailExists = await this.requestersRepository.findByEmail(
        data.email,
      )

      if (emailExists) {
        throw new AppError("Email already in use by another requester")
      }
    }

    await this.requestersRepository.update(id, data)
  }
}
