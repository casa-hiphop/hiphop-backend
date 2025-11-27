import type { FastifyInstance } from "fastify"

import { usersRoutes } from "../../domains/users/infra/routes/users.routes"
import { authRoutes } from "../../domains/users/infra/routes/auth.routes"
import { forgotPasswordRoutes } from "../../domains/users/infra/routes/forgot-password.routes"
import { resetPasswordRoutes } from "../../domains/users/infra/routes/reset-password.routes"
import { unitsRoutes } from "../../domains/units/infra/routes/units.routes"
import { toolsRoutes } from "../../domains/tools/infra/routes/tools.routes"

export async function appRoutes(server: FastifyInstance) {
  server.register(usersRoutes, { prefix: "/users" })
  server.register(authRoutes, { prefix: "/login" })
  server.register(forgotPasswordRoutes, { prefix: "/forgot-password" })
  server.register(resetPasswordRoutes, { prefix: "/reset-password" })
  server.register(unitsRoutes, { prefix: "/units" })
  server.register(toolsRoutes, { prefix: "/tools" })
}