import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { AppError } from "../../../../shared/error/AppError"
import { makeCreateBorrow } from "../../use-cases/factories/make-create-borrow"
import { makeGetAllBorrows } from "../../use-cases/factories/make-get-all-borrows"
import { makeGetBorrowById } from "../../use-cases/factories/make-get-borrow-by-id"
import { makeGetPendingBorrows } from "../../use-cases/factories/make-get-pending-borrows"
import { makeGetOverdueBorrows } from "../../use-cases/factories/make-get-overdue-borrows"
import { makeGetBorrowsByTool } from "../../use-cases/factories/make-get-borrows-by-tool"
import { makeUpdateBorrow } from "../../use-cases/factories/make-update-borrow"
import { makeDeleteBorrow } from "../../use-cases/factories/make-delete-borrow"
import { makeReturnBorrow } from "../../use-cases/factories/make-return-borrow"
import { makeGetAvailableForReturn } from "../../use-cases/factories/make-get-available-for-return"

export async function createBorrow(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const schema = z.object({
      tool_id: z.string().uuid(),
      unit_id: z.string().uuid(),
      requester_id: z.string().uuid(),
      date: z.string(),
      return_date: z.string(),
    })

    const data = schema.parse(request.body)

    const createBorrow = makeCreateBorrow()

    await createBorrow.execute(data)

    return reply.status(201).send({ message: "Borrow created" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: "Validation error",
        errors: error.issues,
      })
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: error.message,
      })
    }

    console.error("Error creating borrow:", error)
    return reply.status(500).send({
      message: "Internal server error",
    })
  }
}

export async function getBorrows(request: FastifyRequest, reply: FastifyReply) {
  const getAllBorrows = makeGetAllBorrows()

  const { borrows } = await getAllBorrows.execute()

  return reply.status(200).send({ borrows })
}

export async function getBorrowById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    id: z.string().uuid(),
  })

  const { id } = schema.parse(request.params)

  const getBorrowById = makeGetBorrowById()

  const { borrow } = await getBorrowById.execute(id)

  return reply.status(200).send({ borrow })
}

export async function getPendingBorrows(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPendingBorrows = makeGetPendingBorrows()

  const { borrows } = await getPendingBorrows.execute()

  return reply.status(200).send({ borrows })
}

export async function getOverdueBorrows(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getOverdueBorrows = makeGetOverdueBorrows()

  const { borrows } = await getOverdueBorrows.execute()

  return reply.status(200).send({ borrows })
}

export async function getBorrowsByTool(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    tool_id: z.string().uuid(),
  })

  const { tool_id } = schema.parse(request.params)

  const getBorrowsByTool = makeGetBorrowsByTool()

  const { borrows } = await getBorrowsByTool.execute(tool_id)

  return reply.status(200).send({ borrows })
}

export async function updateBorrow(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const bodySchema = z.object({
    tool_id: z.string().uuid().optional(),
    unit_id: z.string().uuid().optional(),
    requester_id: z.string().uuid().optional(),
    date: z.string().optional(),
    return_date: z.string().optional(),
  })

  const { id } = paramsSchema.parse(request.params)
  const parsedData = bodySchema.parse(request.body)

  // Remove undefined values
  const data: Record<string, string> = {}
  if (parsedData.tool_id !== undefined) data.tool_id = parsedData.tool_id
  if (parsedData.unit_id !== undefined) data.unit_id = parsedData.unit_id
  if (parsedData.requester_id !== undefined)
    data.requester_id = parsedData.requester_id
  if (parsedData.date !== undefined) data.date = parsedData.date
  if (parsedData.return_date !== undefined)
    data.return_date = parsedData.return_date

  const updateBorrow = makeUpdateBorrow()
  await updateBorrow.execute(id, data)

  return reply.status(200).send({ message: "Borrow updated" })
}

export async function returnBorrow(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    id: z.string().uuid(),
  })

  const bodySchema = z.object({
    returned_at: z.string().optional(),
  })

  const { id } = schema.parse(request.params)
  const { returned_at } = bodySchema.parse(request.body)

  const returnBorrow = makeReturnBorrow()

  const returnDate = returned_at ? new Date(returned_at) : undefined

  await returnBorrow.execute(id, returnDate)

  return reply.status(200).send({ message: "Borrow returned" })
}

export async function getAvailableForReturn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAvailableForReturn = makeGetAvailableForReturn()

  const { borrows } = await getAvailableForReturn.execute()

  return reply.status(200).send({ borrows })
}

export async function deleteBorrow(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    id: z.string().uuid(),
  })

  const { id } = schema.parse(request.params)

  const deleteBorrow = makeDeleteBorrow()

  await deleteBorrow.execute(id)

  return reply.status(200).send({ message: "Borrow deleted" })
}
