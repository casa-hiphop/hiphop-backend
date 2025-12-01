import { AppError } from "../../../shared/error/AppError"
import type { RequestersRepositoryInterface } from "../repositories/requesters.repository.interface"
import type { RequesterResponseDto } from "../dtos/requester-response.dto"

interface GetRequesterByIdResponseDto {
  requester: RequesterResponseDto
}

export class GetRequesterById {
  constructor(private requestersRepository: RequestersRepositoryInterface) {}

  async execute(id: string): Promise<GetRequesterByIdResponseDto> {
    const requester = await this.requestersRepository.findById(id)

    if (!requester) {
      throw new AppError("Requester not found")
    }

    return { requester }
  }
}
