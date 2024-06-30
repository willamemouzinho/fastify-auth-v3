import { FastifyReply, FastifyRequest } from 'fastify'

import { ListTasksUseCase } from './list-tasks-use-case'

export class ListTasksController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.user as {
      userId: string
      name: string
      username: string
      iat: number
      exp: number
    }

    const listTasksUseCase = new ListTasksUseCase()
    const tasks = await listTasksUseCase.execute({ userId })

    return reply.code(200).send({ tasks })
  }
}
