import type { TokensResponseDto } from "../dtos/tokens/tokens-response.dto"
import type { UpdateUserRequestDto } from "../dtos/user/update-user-request.dto"
import type { UserCreateRequestDto } from "../dtos/user/user-create-request.dto"
import type { UserCreateResponseDto } from "../dtos/user/user-create-response.dto"
import type { UserResponseDto } from "../dtos/user/user-response.dto"

export interface UsersRepositoryInterface {
  create(data: UserCreateRequestDto): Promise<void>
  getUserByEmail(email: string): Promise<UserCreateResponseDto | null>
  createToken(id_user: string, token: string): Promise<void>
  getUserByToken(token: string): Promise<TokensResponseDto>
  updateUserPassword(user_id: string, password: string): Promise<void>
  findAll(): Promise<UserResponseDto[]>
  update(id: string, data: UpdateUserRequestDto): Promise<void>
  delete(id: string): Promise<void>
  getById(id: string): Promise<UserResponseDto | null>
}
