import type { FastifyRequest, FastifyReply } from "fastify"
import { makeCreateTool } from "../../use-cases/factories/make-create-tool"

export class ToolsController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const createTool = makeCreateTool()

    await createTool.execute(request.body as any)

    return reply.status(201).send()
  }
}
