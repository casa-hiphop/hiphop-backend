import { ListTools } from "../../use-cases/list-tool"
import { ToolsRepository } from "../../repositories/knex/tools.repository"

export function makeListTools() {
  const toolsRepository = new ToolsRepository()
  return new ListTools(toolsRepository)
}
