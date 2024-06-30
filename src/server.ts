import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'

import { ensureAuthenticated } from './middlewares/ensure-authenticated'
import { routes } from './routes'
// import { register } from './use-cases/register'
// import { login } from './use-cases/login'
// import { logout } from './use-cases/logout'
// import { getTasks } from './use-cases/get-tasks'
// import { createTask } from './use-cases/create-task'
// import { updateTask } from './use-cases/update-task'
// import { deleteTask } from './use-cases/delete-task'

async function main() {
  const server = fastify({ logger: true })

  // configs
  server.register(fastifyCors)
  server.register(fastifyCookie, { secret: 'djhsohfisid', hook: 'onRequest' })
  // server.register(fastifyJwt, {
  //   secret: String(process.env.JWT_TOKEN_SECRET),
  // })

  // middlewares
  server.decorate('authenticate', ensureAuthenticated)

  // routes
  server.register(routes, { prefix: '/api/v3' })

  // handle errors
  server.setErrorHandler((error, _req, reply) => {
    // if (error.validation) {
    //   return reply.status(422).send(new Error('validation failed'))
    // }
    console.log({ error })

    if (error.validation) {
      // localize.ru(error.validation)
      return reply.status(400).send(error.validation)
    }

    return reply.send(error)
  })

  // start server
  try {
    await server.listen({ port: 3333 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

main()
