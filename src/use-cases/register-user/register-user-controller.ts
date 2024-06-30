import { FastifyReply, FastifyRequest } from 'fastify'

import { RegisterUserUseCase } from './register-user-use-case'

export class RegisterUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { name, username, password } = req.body as {
      name: string
      username: string
      password: string
    }

    const registerUserUseCase = new RegisterUserUseCase()

    const { accessToken, refreshToken } = await registerUserUseCase.execute({
      name,
      username,
      password,
    })

    reply.setCookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
      maxAge: 60 * 60 * 24 * 15, // 15 days
    })

    return reply.code(201).send({ accessToken })
  }
}
