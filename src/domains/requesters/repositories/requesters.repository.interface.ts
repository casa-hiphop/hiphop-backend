import type { CreateRequesterRequestDto } from "../dtos/create-requester-request.dto"
import type { RequesterResponseDto } from "../dtos/requester-response.dto"
import type { UpdateRequesterRequestDto } from "../dtos/update-requester-request.dto"

export interface RequestersRepositoryInterface {
  create(data: CreateRequesterRequestDto): Promise<void>
  findAll(): Promise<RequesterResponseDto[]>
  findById(id: string): Promise<RequesterResponseDto | null>
  findByEmail(email: string): Promise<RequesterResponseDto | null>
  update(id: string, data: UpdateRequesterRequestDto): Promise<void>
  delete(id: string): Promise<void>
}
