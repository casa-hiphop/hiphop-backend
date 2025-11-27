import type { ToolCreateRequestDto } from "../dtos/tool-create-request.dto"
import type { ToolCreateResponseDto } from "../dtos/tool-create-response.dto"
import type { ToolUpdateRequestDto } from "../dtos/tool-update-request.dto";

export interface ToolsRepositoryInterface {
  create(data: ToolCreateRequestDto): Promise<void>
  getToolByName(name: string): Promise<ToolCreateResponseDto | null>

  listAll(): Promise<ToolCreateResponseDto[]>
  getById(id: string): Promise<ToolCreateResponseDto | null>

  update(id: string, data: ToolUpdateRequestDto): Promise<void>
  delete(id: string): Promise<void>
}