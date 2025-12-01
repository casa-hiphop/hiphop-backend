import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCreateRequester } from "../../use-cases/factories/make-create-requester"
import { makeGetAllRequesters } from "../../use-cases/factories/make-get-all-requesters"
import { makeGetRequesterById } from "../../use-cases/factories/make-get-requester-by-id"
import { makeUpdateRequester } from "../../use-cases/factories/make-update-requester"
import { makeDeleteRequester } from "../../use-cases/factories/make-delete-requester"

export async function createRequester(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  })

  const data = schema.parse(request.body)

  const createRequester = makeCreateRequester()

  await createRequester.execute(data)

  return reply.status(201).send({ message: "Requester created" })
}

export async function getRequesters(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllRequesters = makeGetAllRequesters()

  const { requesters } = await getAllRequesters.execute()

  return reply.status(200).send({ requesters })
}

export async function getRequesterById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    id: z.string().uuid(),
  })

  const { id } = schema.parse(request.params)

  const getRequesterById = makeGetRequesterById()

  const { requester } = await getRequesterById.execute(id)

  return reply.status(200).send({ requester })
}

export async function updateRequester(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  })

  const { id } = paramsSchema.parse(request.params)
  const data = bodySchema.parse(request.body)

  const updateRequester = makeUpdateRequester()
  await updateRequester.execute(id, data)

  return reply.status(200).send({ message: "Requester updated" })
}

export async function deleteRequester(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    id: z.string().uuid(),
  })

  const { id } = schema.parse(request.params)

  const deleteRequester = makeDeleteRequester()

  await deleteRequester.execute(id)

  return reply.status(200).send({ message: "Requester deleted" })
}

