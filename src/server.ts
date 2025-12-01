import fastify from "fastify"

import fastifyJwt from "@fastify/jwt"
import fastifyCors from "@fastify/cors"

import { env } from "./shared/env/environments"
import { appRoutes } from "./shared/routes/app.routes"

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
  origin:
    env.NODE_ENV === "local"
      ? true // Permite todas as origins em desenvolvimento
      : [env.FRONTEND_URL, "http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
})

app.get("/health", async () => {
  return { status: "API is running" }
})

app.setErrorHandler((error, request, reply) => {
  console.error("Error:", error)

  if (error instanceof Error) {
    return reply.status(500).send({
      message: error.message || "Internal server error",
    })
  }

  return reply.status(500).send({
    message: "Internal server error",
  })
})

app.register(appRoutes)

app
  .listen({
    port: env.PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("API is running!")
  })
