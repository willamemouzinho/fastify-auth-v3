import { FastifyReply, FastifyRequest } from 'fastify'
import { DeleteTaskUseCase } from './delete-task-use-case'

export class DeleteTaskController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    // const user = req.user as {
    //   id: string
    //   name: string
    //   username: string
    //   iat: number
    //   exp: number
    // }
    const { taskId } = req.params as {
      taskId: string
    }

    const deleteTaskUseCase = new DeleteTaskUseCase()
    await deleteTaskUseCase.execute({ taskId })

    return reply.code(204).send()
  }
}
