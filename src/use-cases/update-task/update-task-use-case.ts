import { postgres } from '../../database/postgres'

export interface IUpdateTaskRequest {
  taskId: string
  title: string
  description: string
}

export class UpdateTaskUseCase {
  async execute({ taskId, title, description }: IUpdateTaskRequest) {
    const task = await postgres.tasks.findUnique({
      where: { id: taskId },
    })
    if (!task) {
      // return reply.code(400).send({ message: 'Task not found' })
      throw new Error('Task not found')
    }

    await postgres.tasks.update({
      data: {
        title,
        description,
      },
      where: { id: taskId },
    })

    return true
  }
}
