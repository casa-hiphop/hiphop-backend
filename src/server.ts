import fastify from "fastify"

import fastifyJwt from "@fastify/jwt"

import { env } from "./shared/env/environments"
import { appRoutes } from "./shared/routes/app.routes"

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.get("/health", async () => {
  return { status: "API is running" }
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
