import { postgres } from '../../database/postgres'

export interface IListTasksRequest {
  userId: string
}

export class ListTasksUseCase {
  async execute({ userId }: IListTasksRequest) {
    const tasks = await postgres.tasks.findMany({
      where: { userId },
      select: {
        title: true,
        description: true,
        createdAt: true,
      },
    })

    return tasks
  }
}
