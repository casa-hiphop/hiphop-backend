import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCreateUnit } from "../../use-cases/factories/make-create-unit"
import { makeGetAllUnits } from "../../use-cases/factories/make-get-all-units"
import { makeGetUnitById } from "../../use-cases/factories/make-get-unit-by-id"
import { makeUpdateUnit } from "../../use-cases/factories/make-update-unit"
import { makeDeleteUnit } from "../../use-cases/factories/make-delete-unit"

export async function createUnit(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    name: z.string(),
    description: z.string(),
    cep: z.string(),
    number: z.string(),
  })

  const { name, description, cep, number } = schema.parse(request.body)

  const createUnit = makeCreateUnit()

  await createUnit.execute({ name, description, cep, number })

  return reply.status(201).send({ message: "Unit created" })
}

export async function getUnits(request: FastifyRequest, reply: FastifyReply) {
  const getAllUnits = makeGetAllUnits()
  
  const { units } = await getAllUnits.execute()
  
  return reply.status(200).send({ units })
}

export async function getUnitById(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    id: z.string().uuid(),
  })

  const { id } = schema.parse(request.params)

  const getUnitById = makeGetUnitById()
  
  const { unit } = await getUnitById.execute({ id })
  
  return reply.status(200).send({ unit })
}

export async function updateUnit(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    cep: z.string(),
    number: z.string(),
  })

  const { id } = paramsSchema.parse(request.params)
  const data = bodySchema.parse(request.body)

  const updateUnit = makeUpdateUnit()
  await updateUnit.execute({ id, ...data })
  
  return reply.status(200).send({ message: "Unit updated" })
}

export async function deleteUnit(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    id: z.string().uuid(),
  })

  const { id } = schema.parse(request.params)

  const deleteUnit = makeDeleteUnit()
  
  await deleteUnit.execute({ id })
  
  return reply.status(200).send({ message: "Unit deleted" })
}