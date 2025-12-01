import type { CreateBorrowRequestDto } from "../dtos/create-borrow-request.dto"
import type { BorrowResponseDto } from "../dtos/borrow-response.dto"
import type { UpdateBorrowRequestDto } from "../dtos/update-borrow-request.dto"

export interface BorrowsRepositoryInterface {
  create(data: CreateBorrowRequestDto): Promise<void>
  findAll(): Promise<BorrowResponseDto[]>
  findById(id: string): Promise<BorrowResponseDto | null>
  findByToolId(tool_id: string): Promise<BorrowResponseDto[]>
  findByRequesterId(requester_id: string): Promise<BorrowResponseDto[]>
  findPending(): Promise<BorrowResponseDto[]>
  findOverdue(): Promise<BorrowResponseDto[]>
  findPendingByToolId(tool_id: string): Promise<BorrowResponseDto[]>
  findAvailableForReturn(): Promise<BorrowResponseDto[]>
  update(id: string, data: UpdateBorrowRequestDto): Promise<void>
  returnBorrow(id: string, returned_at: Date): Promise<void>
  delete(id: string): Promise<void>
}
