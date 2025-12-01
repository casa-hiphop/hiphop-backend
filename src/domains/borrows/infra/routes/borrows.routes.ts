import type { FastifyInstance } from "fastify"
import {
  createBorrow,
  getBorrows,
  getBorrowById,
  getPendingBorrows,
  getOverdueBorrows,
  getBorrowsByTool,
  getAvailableForReturn,
  updateBorrow,
  returnBorrow,
  deleteBorrow,
} from "../controllers/borrows.controller"
import { ensureAuthentication } from "../../../../shared/middlewares/ensure-authentication"

export async function borrowsRoutes(app: FastifyInstance) {
  app.post("/", { onRequest: [ensureAuthentication] }, createBorrow)
  app.get("/", { onRequest: [ensureAuthentication] }, getBorrows)
  app.get("/pending", { onRequest: [ensureAuthentication] }, getPendingBorrows)
  app.get("/overdue", { onRequest: [ensureAuthentication] }, getOverdueBorrows)
  app.get(
    "/available-for-return",
    { onRequest: [ensureAuthentication] },
    getAvailableForReturn,
  )
  app.get(
    "/tool/:tool_id",
    { onRequest: [ensureAuthentication] },
    getBorrowsByTool,
  )
  app.get("/:id", { onRequest: [ensureAuthentication] }, getBorrowById)
  app.put("/:id", { onRequest: [ensureAuthentication] }, updateBorrow)
  app.patch("/:id/return", { onRequest: [ensureAuthentication] }, returnBorrow)
  app.delete("/:id", { onRequest: [ensureAuthentication] }, deleteBorrow)
}
