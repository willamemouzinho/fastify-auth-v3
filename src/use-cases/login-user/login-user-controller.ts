import { FastifyReply, FastifyRequest } from 'fastify'
import { LoginUserUseCase } from './login-user-use-case'

export class LoginUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { username, password } = req.body as {
      username: string
      password: string
    }

    const loginUserUseCase = new LoginUserUseCase()
    const { accessToken, refreshToken } = await loginUserUseCase.execute({
      username,
      password,
    })

    reply.setCookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
      maxAge: 60 * 60,
    })

    return reply.code(200).send({ accessToken })
  }
}
