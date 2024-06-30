import { postgres } from '../../database/postgres'

export interface IDeleteTaskRequest {
  taskId: string
}

export class DeleteTaskUseCase {
  async execute({ taskId }: IDeleteTaskRequest) {
    const task = await postgres.tasks.findUnique({
      where: { id: taskId },
    })
    if (!task) {
      // return reply.code(400).send({ message: 'Task not found' })
      throw new Error('Task not found')
    }

    await postgres.tasks.delete({
      where: { id: taskId },
    })

    return true
  }
}
