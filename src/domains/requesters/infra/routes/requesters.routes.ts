import type { FastifyInstance } from "fastify"
import {
  createRequester,
  getRequesters,
  getRequesterById,
  updateRequester,
  deleteRequester,
} from "../controllers/requesters.controller"
import { ensureAuthentication } from "../../../../shared/middlewares/ensure-authentication"

export async function requestersRoutes(app: FastifyInstance) {
  app.post("/", { onRequest: [ensureAuthentication] }, createRequester)
  app.get("/", { onRequest: [ensureAuthentication] }, getRequesters)
  app.get("/:id", { onRequest: [ensureAuthentication] }, getRequesterById)
  app.put("/:id", { onRequest: [ensureAuthentication] }, updateRequester)
  app.delete("/:id", { onRequest: [ensureAuthentication] }, deleteRequester)
}
