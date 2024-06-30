import { FastifyInstance } from 'fastify'
import { RegisterUserController } from './use-cases/register-user/register-user-controller'
import { LoginUserController } from './use-cases/login-user/login-user-controller'
import { LogoutUserController } from './use-cases/logout-user/logout-user-controller'
import { CreateTaskController } from './use-cases/create-task/create-task-controller'
import { ListTasksController } from './use-cases/list-tasks/list-tasks-controller'
import { UpdateTaskController } from './use-cases/update-task/update-task-controller'
import { DeleteTaskController } from './use-cases/delete-task/delete-task-controller'

const registerUserController = new RegisterUserController()
const loginUserController = new LoginUserController()
const logoutUserController = new LogoutUserController()
const createTaskController = new CreateTaskController()
const listTasksController = new ListTasksController()
const updateTaskController = new UpdateTaskController()
const deleteTaskController = new DeleteTaskController()

export async function routes(server: FastifyInstance) {
  server.post('/auth/register', registerUserController.handle)
  server.post('/auth/login', loginUserController.handle)
  server.post(
    '/auth/logout',
    { onRequest: [server.authenticate] },
    logoutUserController.handle
  )
  // routes - tasks
  server.post(
    '/tasks',
    { onRequest: [server.authenticate] },
    createTaskController.handle
  )
  server.get(
    '/tasks',
    { onRequest: [server.authenticate] },
    listTasksController.handle
  )
  server.patch(
    '/tasks/:taskId',
    { onRequest: [server.authenticate] },
    updateTaskController.handle
  )
  server.delete(
    '/tasks/:taskId',
    { onRequest: [server.authenticate] },
    deleteTaskController.handle
  )
}
