import { AppError } from "../../../shared/error/AppError"
import type { CreateRequesterRequestDto } from "../dtos/create-requester-request.dto"
import type { RequestersRepositoryInterface } from "../repositories/requesters.repository.interface"

export class CreateRequester {
  constructor(private requestersRepository: RequestersRepositoryInterface) {}

  async execute(data: CreateRequesterRequestDto) {
    const requesterExists = await this.requestersRepository.findByEmail(
      data.email,
    )

    if (requesterExists) {
      throw new AppError("Requester with this email already exists")
    }

    await this.requestersRepository.create(data)
  }
}
