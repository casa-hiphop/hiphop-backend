import type { FastifyInstance } from "fastify"
import { createUnit, getUnits, getUnitById, updateUnit, deleteUnit } from "../controllers/units.controller"
import { ensureAuthentication } from "../../../../shared/middlewares/ensure-authentication"

export async function unitsRoutes(app: FastifyInstance) {
  app.post("/", { onRequest: [ensureAuthentication] }, createUnit)
  app.get("/", { onRequest: [ensureAuthentication] }, getUnits)
  app.get("/:id", { onRequest: [ensureAuthentication] }, getUnitById)
  app.put("/:id", { onRequest: [ensureAuthentication] }, updateUnit)        
  app.delete("/:id", { onRequest: [ensureAuthentication] }, deleteUnit)
}
