import { DeleteTool } from "../delete-tool"
import { ToolsRepository } from "../../repositories/knex/tools.repository"

export function makeDeleteTool() {
  const toolsRepository = new ToolsRepository()
  return new DeleteTool(toolsRepository)
}