import type { ToolsRepositoryInterface } from "../repositories/tools.interface"

export class ListTools {
  constructor(private toolsRepository: ToolsRepositoryInterface) {}

  async execute() {
    return await this.toolsRepository.listAll()
  }
}