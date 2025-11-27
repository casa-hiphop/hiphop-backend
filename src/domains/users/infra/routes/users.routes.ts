import type { FastifyInstance } from "fastify"
import { 
  createUser, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from "../controllers/users.controller"

export async function usersRoutes(app: FastifyInstance) {
  app.post("/", createUser)
  app.get("/", getAllUsers)
  app.get("/:id", getUserById)
  app.put("/:id", updateUser)
  app.delete("/:id", deleteUser)
}
