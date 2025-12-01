export interface BorrowResponseDto {
  id: string
  tool_id: string
  unit_id: string
  requester_id: string
  date: Date
  return_date: Date
  returned_at: Date | null
  created_at: Date
  updated_at: Date
  // Relacionamentos (opcional, pode ser preenchido via join)
  tool?: {
    id: string
    name: string
    brand: string
  }
  unit?: {
    id: string
    name: string
    city: string
    state: string
  }
  requester?: {
    id: string
    name: string
    email: string
    phone: string
  }
}
