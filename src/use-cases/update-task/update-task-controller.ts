import { FastifyReply, FastifyRequest } from 'fastify'

import { UpdateTaskUseCase } from './update-task-use-case'

export class UpdateTaskController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    // const user = req.user as {
    //   userId: string
    //   name: string
    //   username: string
    //   iat: number
    //   exp: number
    // }
    const { taskId } = req.params as {
      taskId: string
    }
    const { title, description } = req.body as {
      title: string
      description: string
    }

    const updateTaskUseCase = new UpdateTaskUseCase()
    await updateTaskUseCase.execute({ taskId, title, description })

    return reply.code(204).send()
  }
}
