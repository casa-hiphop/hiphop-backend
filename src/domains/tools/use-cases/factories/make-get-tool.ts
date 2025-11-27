import { GetToolById } from "../get-tool"
import { ToolsRepository } from "../../repositories/knex/tools.repository"

export function makeGetTool() {
  const toolsRepository = new ToolsRepository()
  return new GetToolById(toolsRepository)
}