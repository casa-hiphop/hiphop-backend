import { connection } from "../../../../config/database"
import type { TokensResponseDto } from "../../dtos/tokens/tokens-response.dto"
import type { UpdateUserRequestDto } from "../../dtos/user/update-user-request.dto"
import type { UserCreateRequestDto } from "../../dtos/user/user-create-request.dto"
import type { UserCreateResponseDto } from "../../dtos/user/user-create-response.dto"
import type { UserResponseDto } from "../../dtos/user/user-response.dto"
import type { UsersRepositoryInterface } from "../users.interface"

export class UsersRepository implements UsersRepositoryInterface {
  async create(data: UserCreateRequestDto): Promise<void> {
    await connection("users").insert(data)
  }

  async getUserByEmail(email: string): Promise<UserCreateResponseDto | null> {
    const user = await connection("users").where("email", email).first()

    return user
  }

  async createToken(id_user: string, token: string): Promise<void> {
    await connection("tokens").insert({ user_id: id_user, token })
  }

  async getUserByToken(token: string): Promise<TokensResponseDto> {
    const result = await connection("tokens")
      .where({
        token,
      })
      .first()

    return result
  }

  async updateUserPassword(user_id: string, password: string): Promise<void> {
    await connection.transaction(async (trx) => {
      await trx("users").where("id", user_id).update({ password })
      await trx("tokens").delete().where({ user_id })
    })
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await connection("users")
      .select(
        "id",
        "name",
        "email",
        "created_at",
        "updated_at",
        "status"
      )
      .orderBy("created_at", "desc")

    return users
  }

  async update(id: string, data: UpdateUserRequestDto): Promise<void> {
    await connection("users").where("id", id).update({
      ...data,
      updated_at: new Date()
    })
  }

  async delete(id: string): Promise<void> {
    await connection("users").where("id", id).update({
      status: false,
      updated_at: new Date()
    })
  }

  async getById(id: string): Promise<UserResponseDto | null> {
    const user = await connection("users")
      .select(
        "id",
        "name",
        "email",
        "created_at",
        "updated_at",
        "status"
      )
      .where("id", id).first()
    return user
  }
}
