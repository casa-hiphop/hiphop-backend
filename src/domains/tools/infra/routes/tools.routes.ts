import type { FastifyInstance } from "fastify"

import { makeCreateTool } from "../../use-cases/factories/make-create-tool"
import { makeListTools } from "../../use-cases/factories/make-list-tool"
import { makeGetTool } from "../../use-cases/factories/make-get-tool"
import { makeUpdateTool } from "../../use-cases/factories/make-update-tool"
import { makeDeleteTool } from "../../use-cases/factories/make-delete-tool"

export async function toolsRoutes(app: FastifyInstance) {

  // CREATE
  app.post("/", async (request, reply) => {
    const createTool = makeCreateTool()
    await createTool.execute(request.body as any)

    return reply.status(201).send({ message: "Tool created successfully" })
  })

  // LIST ALL
  app.get("/", async (_, reply) => {
    const listTools = makeListTools()
    const tools = await listTools.execute()
    return reply.send(tools)
  })

  // GET BY ID
  app.get<{
    Params: { id: string }
  }>("/:id", async (request, reply) => {
    const getTool = makeGetTool()
    const tool = await getTool.execute(request.params.id)
    return reply.send(tool)
  })

  // UPDATE
app.put<{
  Params: { id: string }
  Body: {
    name?: string
    description?: string
    brand?: string
    quantity?: number
  }
}>("/:id", async (request, reply) => {
  const updateTool = makeUpdateTool()

  await updateTool.execute({
    id: request.params.id,
    ...request.body,
  })

  return reply.send({ message: "Tool updated successfully" })
})

  // DELETE
  app.delete<{
    Params: { id: string }
  }>("/:id", async (request, reply) => {
    const deleteTool = makeDeleteTool()
    await deleteTool.execute(request.params.id)

    return reply.send({ message: "Tool deleted successfully" })
  })
}
