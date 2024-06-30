import { FastifyReply, FastifyRequest } from 'fastify'
import { LogoutUserUseCase } from './logout-user-use-case'

export class LogoutUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.user as {
      userId: string
    }
    const { refreshToken } = req.cookies
    const accessToken = req.headers.authorization!.split(' ')[1]
    reply.clearCookie('refreshToken')
    // await redis.set()

    const logoutUserUseCase = new LogoutUserUseCase()
    await logoutUserUseCase.execute({
      accessToken: refreshToken as string,
      refreshToken: refreshToken as string,
      userId,
    })

    return reply.code(200).send()
  }
}

// const votes = await redis.zincrby(
//   pollId,
//   -1,
//   userPreviousVoteOnPoll.pollOptionId
// )
