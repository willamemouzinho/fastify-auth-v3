import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateTaskUseCase } from './create-task-use-case'

export class CreateTaskController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.user as {
      userId: string
      name: string
      username: string
      iat: number
      exp: number
    }
    const { title, description } = req.body as {
      title: string
      description: string
    }

    const createTaskUseCase = new CreateTaskUseCase()

    const task = await createTaskUseCase.execute({
      title,
      description,
      userId,
    })

    return reply.code(201).send({ task })
  }
}
