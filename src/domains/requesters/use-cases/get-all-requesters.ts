import type { RequestersRepositoryInterface } from "../repositories/requesters.repository.interface"
import type { RequesterResponseDto } from "../dtos/requester-response.dto"

interface GetAllRequestersResponseDto {
  requesters: RequesterResponseDto[]
}

export class GetAllRequesters {
  constructor(private requestersRepository: RequestersRepositoryInterface) {}

  async execute(): Promise<GetAllRequestersResponseDto> {
    const requesters = await this.requestersRepository.findAll()
    return { requesters }
  }
}
