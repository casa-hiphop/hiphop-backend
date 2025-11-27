import type { ToolsRepositoryInterface } from "../repositories/tools.interface"
import { AppError } from "../../../shared/error/AppError"

export class UpdateTool {
  constructor(private toolsRepository: ToolsRepositoryInterface) {}

  async execute(data: { id: string; [key: string]: any }) {
    const { id, ...updateData } = data

    const tool = await this.toolsRepository.getById(id)

    if (!tool) throw new AppError("Tool not found")

    await this.toolsRepository.update(id, updateData)
  }
}
