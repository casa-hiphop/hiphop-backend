import { AppError } from "../../../shared/error/AppError"
import type { RequestersRepositoryInterface } from "../repositories/requesters.repository.interface"

export class DeleteRequester {
  constructor(private requestersRepository: RequestersRepositoryInterface) {}

  async execute(id: string) {
    const requester = await this.requestersRepository.findById(id)

    if (!requester) {
      throw new AppError("Requester not found")
    }

    await this.requestersRepository.delete(id)
  }
}
