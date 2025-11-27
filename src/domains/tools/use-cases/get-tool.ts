import type { ToolsRepositoryInterface } from "../repositories/tools.interface"
import { AppError } from "../../../shared/error/AppError"

export class GetToolById {
  constructor(private toolsRepository: ToolsRepositoryInterface) {}

  async execute(id: string) {
    const tool = await this.toolsRepository.getById(id)

    if (!tool) throw new AppError("Tool not found")

    return tool
  }
}