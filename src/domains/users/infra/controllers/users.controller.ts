import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeCreateUser } from "../../use-cases/factories/make-create-user"
import { makeGetAllUsers } from "../../use-cases/factories/make-get-all-users"
import { makeGetUserById } from "../../use-cases/factories/make-get-user-by-id"
import { makeUpdateUser } from "../../use-cases/factories/make-update-user"
import { makeDeleteUser } from "../../use-cases/factories/make-delete-users"

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const { name, email, password } = schema.parse(request.body)

  const createUser = makeCreateUser()

  await createUser.execute({ name, email, password })

  return reply.status(201).send({ message: "User created" })  
}

export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
  const getAllUsers = makeGetAllUsers()

  const { users } = await getAllUsers.execute()

  return reply.status(200).send(users)
}

export async function getUserById(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    id: z.string(),
  })

  const { id } = schema.parse(request.params)

  const getUserById = makeGetUserById()

  const { user } = await getUserById.execute({ id })

  return reply.status(200).send(user)
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({ 
    id: z.string().uuid(),
  })

  const bodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    status: z.boolean().optional(),
  })  

  const { id } = paramsSchema.parse(request.params)
  const data = bodySchema.parse(request.body)

  const updateUser = makeUpdateUser()

  await updateUser.execute({ id, ...data })

  return reply.status(200).send({ message: "User updated" })
}

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    id: z.string().uuid(),
  })

  const { id } = schema.parse(request.params)

  const deleteUser = makeDeleteUser()

  await deleteUser.execute({ id })

  return reply.status(200).send({ message: "User deleted" })
}