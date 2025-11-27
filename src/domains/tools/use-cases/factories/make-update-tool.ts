import { UpdateTool } from "../update-tool"
import { ToolsRepository } from "../../repositories/knex/tools.repository"

export function makeUpdateTool() {
  const toolsRepository = new ToolsRepository()
  return new UpdateTool(toolsRepository)
}