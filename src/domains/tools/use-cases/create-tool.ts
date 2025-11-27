import type { ToolsRepositoryInterface } from "../repositories/tools.interface"
import type { ToolCreateRequestDto } from "../dtos/tool-create-request.dto"
import { AppError } from "../../../shared/error/AppError"
export class CreateTool {
  constructor(private toolsRepository: ToolsRepositoryInterface) {}

  async execute(data: ToolCreateRequestDto) {
    const toolExists = await this.toolsRepository.getToolByName(data.name)

    if (toolExists) {
      throw new AppError("Tool already exists")
    }

    await this.toolsRepository.create(data)
  }
}