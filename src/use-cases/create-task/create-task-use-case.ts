import { postgres } from '../../database/postgres'

export interface ICreateTaskRequest {
  title: string
  description: string
  userId: string
}

export class CreateTaskUseCase {
  async execute({ title, description, userId }: ICreateTaskRequest) {
    const task = await postgres.tasks.create({
      data: { title, description, userId },
    })

    return task
  }
}
