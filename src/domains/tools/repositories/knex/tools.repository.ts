import { connection } from "../../../../config/database"
import type { ToolCreateRequestDto } from "../../dtos/tool-create-request.dto"
import type { ToolCreateResponseDto } from "../../dtos/tool-create-response.dto"
import type { ToolUpdateRequestDto } from "../../dtos/tool-update-request.dto"
import type { ToolsRepositoryInterface } from "../tools.interface"

export class ToolsRepository implements ToolsRepositoryInterface {
  
  async create(data: ToolCreateRequestDto): Promise<void> {
    await connection("tools").insert(data)
  }

  async getToolByName(name: string): Promise<ToolCreateResponseDto | null> {
    return await connection("tools").where("name", name).first()
  }

  async listAll(): Promise<ToolCreateResponseDto[]> {
    return await connection("tools").select("*")
  }

  async getById(id: string): Promise<ToolCreateResponseDto | null> {
    return await connection("tools").where("id", id).first()
  }

  async update(id: string, data: ToolUpdateRequestDto): Promise<void> {
    await connection("tools").where("id", id).update(data)
  }

  async delete(id: string): Promise<void> {
    await connection("tools").where("id", id).del()
  }
}
