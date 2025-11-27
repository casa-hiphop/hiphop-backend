import { CreateTool } from "../create-tool"
import { ToolsRepository } from "../../repositories/knex/tools.repository"

export function makeCreateTool() {
  const toolsRepository = new ToolsRepository()
  const createTool = new CreateTool(toolsRepository)

  return createTool
}